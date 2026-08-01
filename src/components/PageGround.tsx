import GroundDecor from './GroundDecor'
import { useFarm } from '../context/FarmContext'
import { grassBackground } from '../lib/grass'

/**
 * 内页页脚地面：与主页同款的绿色地块 + 树 / 树篱 / 草丛 / 动物队列（四季换贴图）。
 * 放在页面最底部——内容长时滚动到最下方可见，内容短时由 flex 布局压到视口底部。
 */
export default function PageGround() {
  const { cfg } = useFarm()
  return (
    <div className="relative z-10 h-60 w-full overflow-hidden" aria-hidden>
      {/* 底部绿色地块（与主页一致：深色草线 + 点阵草地，随季节变色） */}
      <div className="absolute bottom-0 left-0 right-0 h-14">
        <div className="h-2 w-full" style={{ background: cfg.grassDark }} />
        <div className="h-full w-full" style={grassBackground(cfg)} />
      </div>
      {/* 地面四季装饰（树 / 树篱 / 草丛 / 动物队列，叠在草地之上） */}
      <GroundDecor season={cfg.id} />
    </div>
  )
}
