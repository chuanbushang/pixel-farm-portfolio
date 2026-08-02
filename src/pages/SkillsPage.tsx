import Skills from '../sections/Skills'
import PageGround from '../components/PageGround'
import PageTurn from '../components/PageTurn'

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-3 py-20 sm:px-4 sm:py-28 md:max-w-none md:w-4/5">
        <Skills />
      </div>
      <PageTurn />
      <PageGround />
    </div>
  )
}
