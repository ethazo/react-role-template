import { Link, Outlet } from '@tanstack/react-router'
import { useAuth } from '@/shared/auth/useAuth'
import { useNavigation } from '@/shared/auth/useNavigation'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { BrandToggle } from '@/shared/components/BrandToggle'
import { FontToggle } from '@/shared/components/FontToggle'
import { Button } from '@/components/ui/button'

/**
 * 学生端自定义布局：顶部横向导航 + 品牌渐变背景。
 * 刻意做成与「管理后台侧边菜单」完全不同的形态，
 * 证明「导航数据」与「外观」解耦——同一份 useNavigation()，呈现方式各角色自定。
 *
 * 配色已全面改用品牌令牌（--primary/--accent...）：换皮肤即整体变色，
 * 不再有任何硬编码颜色；明暗模式由令牌自动适配。
 */
export function StudentLayout() {
  const nav = useNavigation()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-accent to-background">
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          <span className="text-lg font-bold text-primary">学习空间</span>
          <nav className="flex gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-4 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm text-muted-foreground">{user?.name}</span>
          <BrandToggle />
          <FontToggle />
          <ModeToggle />
          <Button variant="ghost" size="sm" onClick={logout}>
            退出
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto px-8 pb-8">
        <Outlet />
      </main>
    </div>
  )
}
