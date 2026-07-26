import type { CSSProperties } from 'react'
import type { SeasonConfig } from '../data/seasons'

/** 季节草地样式：6px 双色细条纹 + 8px 点阵纹理（仿星露谷地面质感） */
export function grassBackground(cfg: SeasonConfig): CSSProperties {
  return {
    background: `
      radial-gradient(circle at 3px 3px, ${cfg.grassDark}80 1.5px, transparent 1.5px),
      repeating-linear-gradient(90deg, ${cfg.grassA} 0 6px, ${cfg.grassB} 6px 12px)
    `,
    backgroundSize: '8px 8px, auto',
  }
}
