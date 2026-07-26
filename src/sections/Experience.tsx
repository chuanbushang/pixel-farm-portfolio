import ExpandableItem from '../components/ExpandableItem'
import SeasonalBox from '../components/SeasonalBox'
import { experience } from '../data/profile'
import { useFarm } from '../context/FarmContext'

export default function Experience() {
  const { season } = useFarm()
  return (
    <SeasonalBox season={season} label="经历">
      <div className="space-y-4">
        {experience.map((item) => (
          <ExpandableItem
            key={item.title}
            title={item.title}
            badge={item.period}
            tag={item.tag}
            brief={item.brief}
            detail={item.detail}
            images={item.images}
          />
        ))}
      </div>
    </SeasonalBox>
  )
}
