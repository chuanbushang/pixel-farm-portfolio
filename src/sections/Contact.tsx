import SeasonalBox from '../components/SeasonalBox'
import { profile } from '../data/profile'
import { useFarm } from '../context/FarmContext'

export default function Contact() {
  const { season } = useFarm()
  return (
    <SeasonalBox season={season} label="对话">
      <p className="font-pixel mb-5 text-lg text-[#3b2a1a]">「要给我写信吗？我随时都在农场。」</p>

      <ul className="space-y-2">
        {profile.contacts.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              {...(contact.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group flex items-baseline gap-2 border-2 border-transparent px-3 py-2 font-pixel text-base text-[#3b2a1a] transition-colors hover:border-[#8b5a2b] hover:bg-[#fdf3d8]"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">►</span>
              <span className="text-[#8b5a2b]">{contact.label}：</span>
              <span className="underline decoration-dotted underline-offset-4">{contact.value}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t-2 border-dashed border-[#8b5a2b] pt-4">
        <a href="/assets/docs/resume.pdf" download className="wood-btn inline-block px-4 py-2">
          下载简历 ↓
        </a>
        <p className="font-pixel mt-2 text-xs text-[#8b5a2b]">
          （把 resume.pdf 放进 public/assets/docs/ 即可生效）
        </p>
      </div>
    </SeasonalBox>
  )
}
