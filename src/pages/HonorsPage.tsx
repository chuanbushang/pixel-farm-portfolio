import Honors from '../sections/Honors'
import PageGround from '../components/PageGround'

export default function HonorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-4 py-28 md:max-w-none md:w-4/5">
        <Honors />
      </div>
      <PageGround />
    </div>
  )
}
