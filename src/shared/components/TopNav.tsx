import { useState, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { useNavigation } from '@/shared/auth/useNavigation'
import { NavIcon } from '@/shared/nav/icons'
import { UserMenu } from '@/shared/components/UserMenu'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { APP_NAME, APP_LOGO_TEXT } from '@/config/app'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

/**
 * 顶部水平导航条（学生端 / 教师端共用的「原语」）。
 *
 * 与后台侧边栏不同，这是面向「使用者」而非「管理者」的导航形态：
 * 横向、轻量、品牌在左、操作在右。导航数据仍来自 useNavigation()（路由表派生），
 * 外观由 tone 决定，让学生端（pill 更亲和）与教师端（underline 更专业）在共用
 * 同一结构的同时拥有不同气质——是「配置出两种外壳」，而非「共用一个外壳」。
 */
export function TopNav({
  tone = 'pill',
  rightExtra,
}: {
  tone?: 'pill' | 'underline'
  rightExtra?: ReactNode
}) {
  const nav = useNavigation()
  const [open, setOpen] = useState(false)

  const desktopLink = (active: boolean) =>
    tone === 'pill'
      ? cn(
          'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
          active
            ? 'bg-gradient-to-r from-primary to-brand-accent text-primary-foreground shadow-sm shadow-primary/25'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )
      : cn(
          'inline-flex h-16 items-center gap-2 border-b-2 px-1 text-sm font-medium transition-colors',
          active
            ? 'border-primary text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        )

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur supports-backdrop-filter:bg-card/65">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* 品牌区 */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-accent text-sm font-bold text-primary-foreground shadow-sm">
            {APP_LOGO_TEXT}
          </span>
          <span className="font-heading text-base font-semibold tracking-tight text-foreground">
            {APP_NAME}
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} activeOptions={{ exact: true }}>
              {({ isActive }) => (
                <span className={desktopLink(isActive)}>
                  <NavIcon name={item.icon} />
                  {item.title}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* 右侧操作 */}
        <div className="ml-auto flex items-center gap-2">
          {rightExtra}
          <ModeToggle />
          <UserMenu variant="avatar" />
          {/* 移动端汉堡 */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="打开菜单">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 gap-0 p-0">
              <SheetTitle className="flex items-center gap-2.5 border-b border-border p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand-accent text-sm font-bold text-primary-foreground">
                  {APP_LOGO_TEXT}
                </span>
                {APP_NAME}
              </SheetTitle>
              <nav className="flex flex-col gap-1 p-3">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: true }}
                    onClick={() => setOpen(false)}
                  >
                    {({ isActive }) => (
                      <span
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-gradient-to-r from-primary to-brand-accent text-primary-foreground shadow-sm shadow-primary/25'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        )}
                      >
                        <NavIcon name={item.icon} />
                        {item.title}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
