import { Fragment } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { BellIcon, SearchIcon } from 'lucide-react'
import { useNavigation } from '@/shared/auth/useNavigation'
import { useBreadcrumbs } from '@/shared/nav/useBreadcrumbs'
import { NavIcon } from '@/shared/nav/icons'
import { UserMenu } from '@/shared/components/UserMenu'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { APP_NAME, APP_LOGO_TEXT } from '@/config/app'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

/**
 * 后台型侧边栏布局（仅管理员使用）。
 *
 * 管理端是数据/表格密集的「控制台」场景，侧边栏 + 顶栏搜索的形态最合适；
 * 学生端 / 教师端则各自使用门户式 / 工作区式的顶栏布局（见各 modules 下的 layout 目录）。
 *
 * 基于项目内置的 shadcn Sidebar 全家桶，天然全响应式：
 *   - 桌面：完整侧边栏，可折叠为图标轨（⌘/Ctrl+B 或点 Rail）
 *   - 手机：侧边栏自动转为 off-canvas 抽屉（SidebarProvider 内建 useIsMobile）
 *
 * 导航数据来自 useNavigation()（路由表派生），外观全部走 sidebar-* 语义令牌——
 * 明暗自动适配，无任何硬编码颜色。品牌名取自 config/app.ts（代码配置）；
 * 可选 title 作为「当前分区」标签。
 */
export function SidebarLayout({ title }: { title?: string }) {
  const nav = useNavigation()
  const crumbs = useBreadcrumbs()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-1 py-1.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand-accent text-sm font-bold text-primary-foreground shadow-sm">
              {APP_LOGO_TEXT}
            </span>
            <div className="grid min-w-0 flex-1 leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate text-sm font-semibold text-sidebar-foreground">
                {APP_NAME}
              </span>
              {title && (
                <span className="truncate text-xs text-sidebar-foreground/70">{title}</span>
              )}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>导航</SidebarGroupLabel>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: true }}
                      className="relative data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground data-[status=active]:before:absolute data-[status=active]:before:top-1/2 data-[status=active]:before:left-0 data-[status=active]:before:h-5 data-[status=active]:before:w-1 data-[status=active]:before:-translate-y-1/2 data-[status=active]:before:rounded-full data-[status=active]:before:bg-sidebar-primary"
                    >
                      <NavIcon name={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <UserMenu variant="full" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {title && (
                <>
                  <BreadcrumbItem className="hidden md:inline-flex">
                    <span className="text-muted-foreground">{title}</span>
                  </BreadcrumbItem>
                  {crumbs.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                </>
              )}
              {crumbs.map((c, i) => (
                <Fragment key={c.title}>
                  <BreadcrumbItem>
                    {c.to ? (
                      <BreadcrumbLink asChild>
                        <Link to={c.to}>{c.title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{c.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {i < crumbs.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative hidden sm:block">
              <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索…"
                className="h-8 w-44 bg-muted/50 pl-8 lg:w-56"
                aria-label="全局搜索"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="通知" className="relative">
              <BellIcon />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-brand-accent" />
            </Button>
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted p-4 sm:p-6 dark:bg-background">
          <div className="mx-auto w-full max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
