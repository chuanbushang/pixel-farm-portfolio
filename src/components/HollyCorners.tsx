import PixelArt from './PixelArt'
import { holly } from './sprites'

/** 冬季专属：页面四角的冬青装饰 */
export default function HollyCorners() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[6]" aria-hidden>
      <PixelArt rows={holly.rows} palette={holly.palette} scale={4} className="absolute left-2 top-2" />
      <PixelArt rows={holly.rows} palette={holly.palette} scale={4} className="absolute right-2 top-2 -scale-x-100" />
      <PixelArt rows={holly.rows} palette={holly.palette} scale={4} className="absolute bottom-2 left-2 -scale-y-100" />
      <PixelArt rows={holly.rows} palette={holly.palette} scale={4} className="absolute bottom-2 right-2 -scale-x-100 -scale-y-100" />
    </div>
  )
}
