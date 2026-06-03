import { Outlet } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

/** 管理员端布局：最小骨架壳——顶条 + 内容区。品牌/侧边栏/导航后期按需重建。 */
export function AdminLayout() {
  const { user, logout } = useAuth()
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex h-14 items-center justify-end border-b px-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{user?.name}</span>
          <Button variant="outline" size="sm" onClick={logout}>
            退出登录
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
