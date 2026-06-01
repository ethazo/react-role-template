import { Outlet } from '@tanstack/react-router'
import { TopNav } from '@/shared/components/TopNav'

/**
 * 学生端布局：门户式（非后台）。
 *
 * 顶部水平导航（pill 激活态，圆润亲和），内容居中、留白充裕，
 * 整体更接近「消费级学习 App」而非管理后台——契合学生「学习 + 参赛」的使用场景。
 */
export function StudentLayout() {
  return (
    <div className="flex min-h-full flex-col bg-muted dark:bg-background">
      <TopNav tone="pill" />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
