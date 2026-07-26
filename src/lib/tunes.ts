// 四季专属 8-bit 合成曲（均为原创，WebAudio 实时合成）
// 记谱：[MIDI 音高, 八分音符步数]，音高 0 = 休止

import type { Season } from '../data/seasons'

export type NoteDef = [midi: number, steps: number]

export interface Tune {
  bpm: number
  leadType: OscillatorType
  leadVol: number
  bassVol: number
  lead: NoteDef[]
  bass: NoteDef[]
}

// 春：明快田园，C 大调
const spring: Tune = {
  bpm: 112,
  leadType: 'square',
  leadVol: 0.09,
  bassVol: 0.16,
  lead: [
    [76, 1], [79, 1], [81, 2], [79, 1], [76, 1], [74, 2],
    [72, 1], [76, 1], [79, 2], [76, 1], [74, 1], [72, 2],
    [74, 1], [76, 1], [79, 1], [81, 1], [79, 1], [76, 1], [74, 1], [76, 1],
    [74, 2], [72, 2], [72, 2], [0, 2],
  ],
  bass: [
    [48, 4], [43, 4],
    [45, 4], [43, 4],
    [41, 4], [43, 4],
    [48, 8],
  ],
}

// 夏：更亮更快，跳跃感
const summer: Tune = {
  bpm: 126,
  leadType: 'square',
  leadVol: 0.085,
  bassVol: 0.15,
  lead: [
    [79, 1], [81, 1], [83, 2], [86, 1], [83, 1], [79, 2],
    [76, 1], [79, 1], [81, 2], [84, 1], [81, 1], [79, 2],
    [81, 1], [83, 1], [84, 1], [86, 1], [84, 1], [81, 1], [83, 1], [81, 1],
    [79, 4], [0, 2], [83, 1], [86, 1],
  ],
  bass: [
    [48, 4], [43, 4],
    [45, 4], [52, 4],
    [41, 4], [43, 4],
    [43, 4], [48, 4],
  ],
}

// 秋：舒缓醇厚，A 小调
const autumn: Tune = {
  bpm: 96,
  leadType: 'triangle',
  leadVol: 0.12,
  bassVol: 0.14,
  lead: [
    [69, 2], [72, 1], [76, 1], [81, 2], [76, 2],
    [79, 2], [76, 1], [74, 1], [72, 2], [74, 2],
    [72, 2], [74, 1], [76, 1], [79, 2], [76, 1], [74, 1],
    [69, 4], [0, 4],
  ],
  bass: [
    [45, 4], [40, 4],
    [41, 4], [48, 4],
    [41, 4], [40, 4],
    [45, 8],
  ],
}

// 冬：空灵缓慢，铃声质感
const winter: Tune = {
  bpm: 80,
  leadType: 'triangle',
  leadVol: 0.13,
  bassVol: 0.12,
  lead: [
    [76, 2], [79, 2], [81, 4],
    [83, 2], [81, 1], [79, 1], [76, 4],
    [81, 2], [79, 1], [76, 1], [74, 2], [76, 2],
    [72, 8],
  ],
  bass: [
    [48, 8],
    [43, 8],
    [45, 8],
    [48, 8],
  ],
}

export const TUNES: Record<Season, Tune> = { spring, summer, autumn, winter }
