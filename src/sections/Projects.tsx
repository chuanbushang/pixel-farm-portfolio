import ExpandableItem from '../components/ExpandableItem'
import SeasonalBox from '../components/SeasonalBox'
import { projects } from '../data/profile'
import { useFarm } from '../context/FarmContext'

export default function Projects() {
  const { season } = useFarm()
  return (
    <SeasonalBox season={season} label="出货箱 · 项目作品">
      <div className="space-y-4">
        {projects.map((project) => (
          <ExpandableItem
            key={project.title}
            title={project.title}
            brief={project.brief}
            tech={project.tech}
            detail={project.detail}
            images={project.images}
          />
        ))}
      </div>
    </SeasonalBox>
  )
}
