import ExpandableItem from '../components/ExpandableItem'
import SeasonalBox from '../components/SeasonalBox'
import { honors } from '../data/profile'
import { useFarm } from '../context/FarmContext'

export default function Honors() {
  const { season } = useFarm()
  return (
    <SeasonalBox season={season} label="成就系统">
      <div className="space-y-4">
        {honors.map((honor, i) => (
          <ExpandableItem
            key={i}
            title={honor.title}
            badge={honor.year}
            brief={honor.org}
            images={honor.images}
            imageHint="证书照片位：把证书照片放进 public/assets/material/ 并告诉 AI 文件名即可挂载"
          />
        ))}
      </div>
    </SeasonalBox>
  )
}
