import { createRoute, createRouter, redirect } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'
import { queryClient } from './queryClient'
import { ErrorPage } from '@/pages/error/ErrorPage'
import { loginRoute } from '@/pages/login/loginRoute'
import { showcaseRoute } from '@/pages/showcase/showcaseRoute'
import { forbiddenRoute } from '@/pages/error/errorRoutes'
import { requireLogin } from '@/shared/auth/guard'
import { getRoleHome } from '@/config/roles'
import { studentRouteTree } from '@/modules/student/routes'
import { teacherRouteTree } from '@/modules/teacher/routes'
import { adminRouteTree } from '@/modules/admin/routes'

// 入口路由 '/': 确保已登录后，按当前用户角色重定向到对应首页
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  ...requireLogin(),
  // requireLogin 的 beforeLoad 已确保登录并把 user 注入 context，这里直接消费
  loader: ({ context }) => {
    throw redirect({ to: getRoleHome(context.user.roles[0]) })
  },
})

// 路由聚合：核心只是把「公共路由 + 各角色模块导出的子树」拼起来，不认识具体角色
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  showcaseRoute,
  forbiddenRoute,
  studentRouteTree,
  teacherRouteTree,
  adminRouteTree,
])

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultErrorComponent: ErrorPage,
  defaultPreload: 'intent',
})

// 让 Link / navigate / getRouteApi 获得全局类型推导
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
