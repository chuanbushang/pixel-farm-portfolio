import { useNavigate } from 'react-router'
import TitleScreen from '../sections/TitleScreen'

/** 主页：仅标题屏（一屏，无滚动），点击大牌子跳转各页面 */
export default function HomePage() {
  const navigate = useNavigate()

  const handleNavigate = (sectionId: string | null) => {
    if (!sectionId) return
    navigate(`/${sectionId}`)
  }

  return <TitleScreen onNavigate={handleNavigate} />
}
