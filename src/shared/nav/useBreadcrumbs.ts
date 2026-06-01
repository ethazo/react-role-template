import { useMatches } from '@tanstack/react-router'
import type { NavMeta } from '@/shared/types'

export interface Crumb {
  title: string
  /** 可跳转路径；当前页（最后一项）不带 to */
  to?: string
  icon?: string
}

/**
 * 从当前激活的路由 matches 派生面包屑。
 *
 * 复用每个路由 staticData.nav 上已声明的标题/图标（与 useNavigation 同源），
 * 不需要再单独维护一份面包屑配置。最后一项视为「当前页」。
 *
 * 多数角色目前是单层导航，结果通常就是一条「当前页」面包屑；
 * 将来出现嵌套（父页也带 nav）时会自动变成多级，无需改这里。
 */
export function useBreadcrumbs(): Crumb[] {
  const matches = useMatches()

  const crumbs: Crumb[] = []
  for (const match of matches) {
    const nav = (match.staticData as { nav?: NavMeta } | undefined)?.nav
    if (!nav?.title) continue
    crumbs.push({ title: nav.title, to: match.fullPath, icon: nav.icon })
  }

  // 末项是当前页，去掉其跳转目标（渲染成不可点的 BreadcrumbPage）
  if (crumbs.length > 0) crumbs[crumbs.length - 1] = { ...crumbs[crumbs.length - 1], to: undefined }

  return crumbs
}
