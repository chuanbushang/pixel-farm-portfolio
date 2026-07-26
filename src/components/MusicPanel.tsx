interface MusicPanelProps {
  volume: number // 0 - 1
  onVolumeChange: (v: number) => void
  defaultMode: boolean
  onToggleDefault: () => void
}

const SEGMENTS = 10

/** 音乐设置面板（主页「音乐」牌子弹出）：音量条 + 默认 BGM 锁定 */
export default function MusicPanel({
  volume,
  onVolumeChange,
  defaultMode,
  onToggleDefault,
}: MusicPanelProps) {
  const filled = Math.round(volume * SEGMENTS)

  return (
    <div className="stardew-textbox flex flex-col items-center gap-3 px-5 py-4 sm:flex-row sm:gap-5">
      {/* 音量条 */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-pixel text-[10px] leading-none text-[#8b5a2b]">音量 {filled * 10}%</span>
        <div className="flex gap-0.5" role="slider" aria-label="音量" aria-valuenow={filled * 10} aria-valuemin={0} aria-valuemax={100}>
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <button
              key={i}
              onClick={() => onVolumeChange((i + 1) / SEGMENTS)}
              onContextMenu={(e) => {
                e.preventDefault()
                onVolumeChange(i / SEGMENTS) // 右键设为该格以下
              }}
              className="h-4 w-2.5 cursor-pointer border-2 border-[#6b4423]"
              style={{ background: i < filled ? '#5bb450' : 'rgba(107, 68, 35, 0.15)' }}
              aria-label={`音量 ${(i + 1) * 10}%`}
            />
          ))}
        </div>
      </div>

      {/* 默认 BGM 锁定 */}
      <button
        onClick={onToggleDefault}
        className="wood-btn px-3 py-2"
        style={defaultMode ? { filter: 'brightness(1.15) saturate(1.2)', transform: 'translateY(2px)' } : undefined}
        aria-pressed={defaultMode}
        title={defaultMode ? '已锁定默认 BGM（bgm-background.mp3），点击恢复季节曲' : '锁定播放默认 BGM（bgm-background.mp3）'}
      >
        <span className="font-pixel text-xs text-[#5a3a1e]">
          {defaultMode ? '♪ 默认曲' : '♪ 季节曲'}
        </span>
      </button>
    </div>
  )
}
