import { redirect } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { meQueryOptions } from './queries'
import type { CurrentUser, RouteMeta } from '@/shared/types'
import type { Role } from '@/config/roles'

interface GuardContext {
  queryClient: QueryClient
}

/** 进路由前确保已登录，返回当前用户；未登录抛重定向到登录页 */
async function ensureUser(context: GuardContext, redirectHref: string): Promise<CurrentUser> {
  const user = await context.queryClient.ensureQueryData(meQueryOptions).catch(() => null)

  if (!user) {
    throw redirect({ to: '/login', search: { redirect: redirectHref } })
  }
  return user
}

/**
 * 角色守卫工厂。挂到路由（或角色布局路由）的 options 上：
 *   createRoute({ ..., ...protect(['teacher'], { title: '课程' }) })
 *
 * - 写入 staticData（供 useNavigation 过滤导航）
 * - beforeLoad 做访问控制：未登录→登录页；登录但无角色→403
 *
 * 注意：这里只有「机制」——比对路由声明的 roles 与用户的 roles，
 * 不出现任何具体角色名的硬编码判断。
 */
export function protect(roles: Role[], nav?: RouteMeta['nav']) {
  return {
    staticData: { roles, nav } satisfies RouteMeta,
    beforeLoad: async ({
      context,
      location,
    }: {
      context: GuardContext
      location: { href: string }
    }) => {
      const user = await ensureUser(context, location.href)
      const allowed = roles.some((role) => user.roles.includes(role))
      if (!allowed) {
        throw redirect({ to: '/403' })
      }
    },
  }
}

/**
 * 仅声明导航元信息（不带守卫）。
 * 用于「已由父级布局路由 protect 守卫」的子页面：只需让它出现在导航里。
 */
export function withNav(roles: Role[], nav: RouteMeta['nav']) {
  return {
    staticData: { roles, nav } satisfies RouteMeta,
  }
}

/** 仅要求登录、不限角色（如「根据角色重定向到首页」的入口路由） */
export function requireLogin() {
  return {
    beforeLoad: async ({
      context,
      location,
    }: {
      context: GuardContext
      location: { href: string }
    }) => {
      const user = await ensureUser(context, location.href)
      return { user }
    },
  }
}
