import PixelArt from './PixelArt'
import { note } from './sprites'

interface MusicToggleProps {
  playing: boolean
  onToggle: () => void
}

/** 右下角小文本框播放键：音符 + 暂停时套 UiButtons 红色禁止符 */
export default function MusicToggle({ playing, onToggle }: MusicToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="stardew-textbox fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center transition-transform hover:-translate-y-0.5"
      aria-label={playing ? '暂停音乐' : '播放音乐'}
      title={playing ? '暂停音乐' : '播放音乐'}
    >
      {playing ? (
        <PixelArt rows={note.rows} palette={note.palette} scale={2} />
      ) : (
        <img
          src="/assets/icons/ui/note-muted.png"
          alt=""
          style={{ width: 34, height: 34, imageRendering: 'pixelated' }}
        />
      )}
    </button>
  )
}
