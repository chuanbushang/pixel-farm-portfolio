import SeasonalBox from '../components/SeasonalBox'
import { profile } from '../data/profile'
import { useFarm } from '../context/FarmContext'

export default function Skills() {
  const { season } = useFarm()
  return (
    <SeasonalBox season={season} label="我的技能">
      <div className="grid gap-4 sm:grid-cols-3">
        {profile.skills.map((cat) => (
          <article
            key={cat.category}
            className="group border-4 border-[#6b4423] bg-[#fdf3d8] p-4 transition-transform hover:-translate-y-0.5"
          >
            <h3 className="font-pixel origin-left text-lg text-[#3b2a1a] transition-all group-hover:scale-[1.03] group-hover:text-[#b0514a]">
              {cat.category}
            </h3>
            <p className="font-pixel mt-1 text-xs text-[#8b5a2b]">{cat.note}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="border-2 border-[#8b5a2b] bg-[#f9e7bd] px-2 py-1 font-pixel text-xs text-[#6b4423]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SeasonalBox>
  )
}
