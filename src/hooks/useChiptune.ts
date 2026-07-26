import { useCallback, useEffect, useRef, useState } from 'react'
import type { NoteDef, Tune } from '../lib/tunes'

// ============================================================
//  8-bit 合成引擎：根据传入的 Tune 实时合成循环曲
// ============================================================

type Event = { midi: number; steps: number } | null

function seq(notes: NoteDef[], total: number): Event[] {
  const out: Event[] = new Array(total).fill(null)
  let i = 0
  for (const [midi, steps] of notes) {
    if (i >= total) break
    if (midi > 0) out[i] = { midi, steps }
    i += steps
  }
  return out
}

const midiHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12)
const STEPS = 32 // 4 小节 × 8 个八分音符

export function useChiptune(tune: Tune, volume = 0.7) {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const timerRef = useRef<number | null>(null)
  const stepRef = useRef(0)
  const nextRef = useRef(0)
  const tuneRef = useRef(tune)
  const volumeRef = useRef(volume)
  const seqRef = useRef<{ lead: Event[]; bass: Event[] }>({ lead: [], bass: [] })
  const [playing, setPlaying] = useState(false)

  // 曲目变化时重新铺排音符（正在播放则无缝换曲）
  useEffect(() => {
    tuneRef.current = tune
    seqRef.current = { lead: seq(tune.lead, STEPS), bass: seq(tune.bass, STEPS) }
    stepRef.current = 0
  }, [tune])

  // 音量变化时平滑调整（播放中实时生效）
  useEffect(() => {
    volumeRef.current = volume
    const ctx = ctxRef.current
    const master = masterRef.current
    if (ctx && master && timerRef.current != null) {
      const g = master.gain
      g.cancelScheduledValues(ctx.currentTime)
      g.setTargetAtTime(0.8 * volume, ctx.currentTime, 0.05)
    }
  }, [volume])

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctxRef.current = new Ctx()
      masterRef.current = ctxRef.current.createGain()
      masterRef.current.gain.value = 0
      masterRef.current.connect(ctxRef.current.destination)
    }
    return ctxRef.current
  }

  const blip = (t: number, midi: number, dur: number, type: OscillatorType, vol: number) => {
    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.value = midiHz(midi)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(vol, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95)
    osc.connect(g)
    g.connect(master)
    osc.start(t)
    osc.stop(t + dur)
  }

  const tick = () => {
    const ctx = ctxRef.current
    if (!ctx) return
    const { bpm, leadType, leadVol, bassVol } = tuneRef.current
    const stepDur = 60 / bpm / 2
    while (nextRef.current < ctx.currentTime + 0.15) {
      const i = stepRef.current % STEPS
      const lead = seqRef.current.lead[i]
      if (lead) blip(nextRef.current, lead.midi, lead.steps * stepDur, leadType, leadVol)
      const bass = seqRef.current.bass[i]
      if (bass) blip(nextRef.current, bass.midi, bass.steps * stepDur, 'triangle', bassVol)
      nextRef.current += stepDur
      stepRef.current++
    }
  }

  const play = useCallback(async () => {
    const ctx = ensureCtx()
    if (ctx.state === 'suspended') await ctx.resume()
    if (timerRef.current != null) return
    stepRef.current = 0
    nextRef.current = ctx.currentTime + 0.06
    const g = masterRef.current!.gain
    g.cancelScheduledValues(ctx.currentTime)
    g.setValueAtTime(0.0001, ctx.currentTime)
    g.linearRampToValueAtTime(0.8 * volumeRef.current, ctx.currentTime + 1.2)
    timerRef.current = window.setInterval(tick, 40)
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    const ctx = ctxRef.current
    if (ctx && masterRef.current) {
      const g = masterRef.current.gain
      g.cancelScheduledValues(ctx.currentTime)
      g.setValueAtTime(g.value, ctx.currentTime)
      g.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.15)
    }
    setPlaying(false)
  }, [])

  useEffect(
    () => () => {
      if (timerRef.current != null) clearInterval(timerRef.current)
    },
    [],
  )

  return { playing, play, pause }
}
