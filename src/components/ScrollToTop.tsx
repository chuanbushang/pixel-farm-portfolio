import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** 路由切换时滚动回页面顶部（React Router 默认保留滚动位置） */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
