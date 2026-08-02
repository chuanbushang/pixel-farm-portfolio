import Contact from '../sections/Contact'
import PageGround from '../components/PageGround'

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-3 py-20 sm:px-4 sm:py-28 md:max-w-none md:w-4/5">
        <Contact />
      </div>
      <PageGround />
    </div>
  )
}
