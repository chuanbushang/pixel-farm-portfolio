import ExpandableItem from '../components/ExpandableItem'
import SeasonalBox from '../components/SeasonalBox'
import { hobbies } from '../data/profile'
import { useFarm } from '../context/FarmContext'

const UI = '/assets/icons/ui'
const iconMap = {
  camera: `${UI}/hobby-camera-4x.png`,
  note: `${UI}/hobby-music-4x.png`,
  bowl: `${UI}/hobby-meal-4x.png`,
  film: `${UI}/hobby-movie-4x.png`,
  star: `${UI}/hobby-star-4x.png`,
} as const

export default function Hobbies() {
  const { season } = useFarm()
  return (
    <SeasonalBox season={season} label="我喜欢的">
      <div className="space-y-4">
        {hobbies.map((hobby) => (
          <ExpandableItem
            key={hobby.title}
            iconImg={iconMap[hobby.icon]}
            title={hobby.title}
            brief={hobby.brief}
            images={hobby.images}
            hideCover={hobby.noCover}
            cornerSprite={hobby.cornerSprite}
          />
        ))}
      </div>
    </SeasonalBox>
  )
}
