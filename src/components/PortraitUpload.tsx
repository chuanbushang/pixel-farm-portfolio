import { useRef, useState } from 'react'

const STORE_KEY = 'farm-portrait-photo'
const DEFAULT_SRC = '/assets/photos/portrait.jpg'

/** 照片上传区域：优先显示 localStorage 里上传的照片，
 * 否则尝试 public/assets/photos/portrait.jpg，都没有则显示占位提示 */
export default function PortraitUpload() {
  const [photo, setPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORE_KEY)
    } catch {
      return null
    }
  })
  const [imgError, setImgError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const showPlaceholder = !photo && imgError

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = String(reader.result)
      try {
        localStorage.setItem(STORE_KEY, data)
      } catch {
        // 照片过大存不下时仅本次会话生效
      }
      setPhoto(data)
      setImgError(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="relative block h-32 w-32 cursor-pointer overflow-hidden border-4 border-[#6b4423] bg-[#b9e3f7] md:h-36 md:w-36"
      title="点击上传照片"
    >
      {showPlaceholder ? (
        <span className="font-pixel flex h-full w-full flex-col items-center justify-center p-2 text-center text-xs leading-relaxed text-[#6b4423]">
          点击上传照片
          <span className="mt-1 text-[10px] text-[#8b5a2b]">
            或把 portrait.jpg 放进 public/assets/photos/
          </span>
        </span>
      ) : (
        <img
          src={photo ?? DEFAULT_SRC}
          alt="我的照片"
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
    </button>
  )
}
