import { useCallback, useEffect, useRef, useState } from 'react'
import { useChiptune } from './useChiptune'
import { TUNES } from '../lib/tunes'
import type { Season } from '../data/seasons'

// ============================================================
//  BGM 播放器（按季节 + 可锁定默认曲）：
//  - mode = 'season' ：优先 public/bgm-<季节>.<ext> → 通用 bgm.<ext> → 季节合成曲
//  - mode = 'default'：只播放通用 public/bgm.<ext>（用户锁定默认 BGM）
//  - 支持 mp3 / ogg / wav / m4a；音量可调并记忆
// ============================================================

const EXTS = ['mp3', 'ogg', 'wav', 'm4a']
// v2：默认音量 50% → 25%（主人反馈太响，2026-07-26）；换 key 让旧存档失效一次
// v3：25% → 12%（主人反馈还是太响，2026-07-26）
// v4：12% → 5%（主人要求，2026-07-26）
const VOLUME_KEY = 'farm-volume-v4'
const DEFAULT_VOLUME = 0.05
// 输出上限：实际输出 = 音量条 × 50%，拉满也只有原文件一半（主人要求，2026-07-26）
const MASTER_CAP = 0.5

function loadVolume(): number {
  const raw = window.localStorage.getItem(VOLUME_KEY)
  if (raw == null) return DEFAULT_VOLUME
  const saved = Number(raw)
  return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : DEFAULT_VOLUME
}

export function useBgm(season: Season) {
  const [volume, setVolumeState] = useState(loadVolume)
  const [defaultMode, setDefaultMode] = useState(false)
  const synth = useChiptune(TUNES[season], volume * MASTER_CAP)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sourceRef = useRef<'file' | 'synth'>('synth')
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  useEffect(() => {
    playingRef.current = playing
  }, [playing])
  const volumeRef = useRef(volume)
  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  // 季节 / 模式变化时重新探测音源
  useEffect(() => {
    let cancelled = false
    const audio = new Audio()
    audio.loop = true
    audio.volume = volumeRef.current * MASTER_CAP // 新建音频对象必须同步当前音量，否则会默认 100%
    audioRef.current = audio

    // 通用默认曲：优先新命名 bgm-background，兼容旧命名 bgm
    const generic = [
      ...EXTS.map((ext) => `/bgm-background.${ext}`),
      ...EXTS.map((ext) => `/bgm.${ext}`),
    ]
    const candidates = defaultMode
      ? generic
      : [...EXTS.map((ext) => `/bgm-${season}.${ext}`), ...generic]
    let idx = 0

    const onReady = () => {
      if (cancelled) return
      sourceRef.current = 'file'
      if (playingRef.current) {
        synth.pause() // 防止与合成曲叠播
        audio.play().catch(() => {})
      }
    }
    const tryNext = () => {
      if (cancelled) return
      if (idx >= candidates.length) {
        sourceRef.current = 'synth'
        if (playingRef.current) void synth.play()
        return
      }
      audio.src = candidates[idx++]
      audio.load()
    }

    audio.addEventListener('canplaythrough', onReady)
    audio.addEventListener('error', tryNext)
    tryNext()

    return () => {
      cancelled = true
      audio.pause()
      audio.removeEventListener('canplaythrough', onReady)
      audio.removeEventListener('error', tryNext)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season, defaultMode])

  // 音量变化：同步到文件播放器（合成器音量由 useChiptune 自行处理）
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume * MASTER_CAP
    window.localStorage.setItem(VOLUME_KEY, String(volume))
  }, [volume])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (sourceRef.current === 'file' && audio && audio.src) {
      try {
        await audio.play()
        setPlaying(true)
        return
      } catch {
        sourceRef.current = 'synth'
      }
    }
    await synth.play()
    setPlaying(true)
  }, [synth])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    synth.pause()
    setPlaying(false)
  }, [synth])

  const toggle = useCallback(() => {
    if (playing) pause()
    else void play()
  }, [playing, play, pause])

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.min(1, Math.max(0, v)))
  }, [])

  const toggleDefaultMode = useCallback(() => {
    setDefaultMode((prev) => !prev)
  }, [])

  // 进网站自动播放尝试：不改动 sourceRef（被浏览器拦截时保持文件源，等首次手势再正式 play）
  // 三级结果：'played' 直接出声；'muted' 静音起播（微信/ Safari 普遍允许），首次手势取消静音；'blocked' 等手势播放
  const tryAutoplay = useCallback(async (): Promise<'played' | 'muted' | 'blocked'> => {
    const audio = audioRef.current
    if (sourceRef.current === 'file' && audio && audio.src) {
      try {
        await audio.play()
        setPlaying(true)
        return 'played'
      } catch {
        // 继续尝试静音起播
      }
      try {
        audio.muted = true
        await audio.play()
        setPlaying(true)
        return 'muted'
      } catch {
        audio.muted = false
        return 'blocked'
      }
    }
    try {
      await synth.play()
      setPlaying(true)
      return 'played'
    } catch {
      return 'blocked'
    }
  }, [synth])

  // 首次手势时恢复：静音起播的取消静音，被拦截的正式播放
  const resumeFromAutoplay = useCallback(async () => {
    const audio = audioRef.current
    if (audio && audio.muted) {
      audio.muted = false
      return
    }
    await play()
  }, [play])

  return { playing, play, pause, toggle, volume, setVolume, defaultMode, toggleDefaultMode, tryAutoplay, resumeFromAutoplay }
}
