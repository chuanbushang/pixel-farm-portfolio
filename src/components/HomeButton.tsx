import { useNavigate } from 'react-router'

/** 右下角「返回主页」按钮：无背景裸贴图（整体占位与音乐键一致 56px），主页自身不显示（由 Layout 控制渲染） */
export default function HomeButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')}
      className="fixed bottom-[5.25rem] right-4 z-50 flex h-14 w-14 cursor-pointer items-center justify-center transition-transform hover:-translate-y-0.5"
      aria-label="返回主页"
      title="返回主页"
    >
      <img
        src="/assets/icons/ui/home.png"
        alt=""
        style={{ width: 52, height: 52, imageRendering: 'pixelated' }}
      />
    </button>
  )
}
