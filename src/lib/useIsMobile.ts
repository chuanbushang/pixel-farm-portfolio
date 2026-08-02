import { useEffect, useState } from 'react'

/** 竖屏/窄屏检测（≤767px，与 Tailwind sm 断点一致）。
 * 用于移动端降级重动画（飘云/蝴蝶/粒子减半），缓解卡顿 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

/** 中等屏检测（≤1023px，与 Tailwind lg 断点一致）。
 * 用于导航折叠：手机 + 平板竖屏都收成「菜单」牌，桌面才平铺 */
export function useIsNarrow() {
  return useMediaQuery('(max-width: 1023px)')
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}
