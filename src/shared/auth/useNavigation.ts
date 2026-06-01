import { useRouter } from '@tanstack/react-router'
import { useAuth } from './useAuth'
import type { Role } from '@/config/roles'
import type { NavMeta } from '@/shared/types'

export interface NavItem {
  to: string
  title: string
  icon?: string
}

interface RouteLike {
  fullPath?: string
  options?: { staticData?: { roles?: Role[]; nav?: NavMeta } }
}

/**
 * 从「路由表 + 当前用户角色」自动派生导航数据。
 *
 * 这是「导航数据」，不是「左侧菜单」——具体渲染成菜单/Tab/卡片/不渲染，
 * 完全由各角色布局自行决定。加了新页面（带 nav 元信息），导航自动出现。
 */
export function useNavigation(): NavItem[] {
  const router = useRouter()
  const { user } = useAuth()

  const routes = Object.values(router.routesById) as RouteLike[]

  const items: Array<NavItem & { order: number }> = []
  for (const route of routes) {
    const meta = route.options?.staticData
    const nav = meta?.nav
    if (!nav) continue
    const roles = meta?.roles
    const visible = !roles || roles.some((role) => user?.roles.includes(role))
    if (!visible) continue
    items.push({
      to: route.fullPath ?? '',
      title: nav.title,
      icon: nav.icon,
      order: nav.order ?? 0,
    })
  }

  return items.sort((a, b) => a.order - b.order).map(({ to, title, icon }) => ({ to, title, icon }))
}
