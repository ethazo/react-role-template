import { Link, Outlet } from '@tanstack/react-router'
import { useAuth } from '@/shared/auth/useAuth'
import { useNavigation } from '@/shared/auth/useNavigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { BrandToggle } from '@/shared/components/BrandToggle'
import { FontToggle } from '@/shared/components/FontToggle'

/**
 * 传统侧边菜单布局：消费 useNavigation() 的导航数据渲染左侧菜单。
 * 给「管理后台型」角色用。其它形态的角色可以用自己的布局，不必套这个。
 *
 * 颜色全部走 sidebar/* 与品牌语义令牌：换皮肤、明暗切换都自动生效。
 */
export function SidebarLayout({ title = '管理后台' }: { title?: string }) {
  const nav = useNavigation()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full w-full">
      <aside className="flex w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 py-4">
          {/* 品牌色块 logo 占位：换皮肤自动变色 */}
          <span className="grid size-7 place-items-center rounded-md bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            U
          </span>
          <span className="text-base font-semibold text-foreground">{title}</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="block rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
          <span className="text-sm text-muted-foreground">欢迎，{user?.name}</span>
          <div className="flex items-center gap-2">
            <BrandToggle />
            <FontToggle />
            <ModeToggle />
            <Button variant="outline" size="sm" onClick={logout}>
              退出登录
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/40 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
