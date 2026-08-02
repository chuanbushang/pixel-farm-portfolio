import { useEffect, useState } from 'react'

/** 竖屏/窄屏检测（≤767px，与 Tailwind sm 断点一致）。
 * 用于移动端降级重动画（飘云/蝴蝶/粒子减半），缓解卡顿 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}
