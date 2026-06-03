import { createRoute, createRouter, redirect } from '@tanstack/react-router'
import { rootRoute } from '@/lib/root-route'
import { queryClient } from '@/lib/react-query'
import { requireLogin } from '@/lib/auth'
import { Spinner } from '@/components/ui/spinner'
import { ErrorPage } from '@/components/errors/ErrorPage'
import { NotFoundPage } from '@/components/errors/NotFoundPage'
import { ForbiddenPage } from '@/components/errors/ForbiddenPage'
import { BlankLayout } from '@/components/errors/BlankLayout'
import { getRoleHome } from '@/config/roles'
import { loginRoute } from '@/features/auth'
import { studentRouteTree } from '@/features/student'
import { teacherRouteTree } from '@/features/teacher'
import { adminRouteTree } from '@/features/admin'

// 入口路由 '/': 确保已登录后，按当前用户角色重定向到对应首页
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  ...requireLogin(),
  // requireLogin 的 beforeLoad 已确保登录并把 user 注入 context，这里直接消费
  loader: ({ context }) => {
    // roles[0] = 主角色;当前后端只返回单角色,多角色时以第一个为默认落地页
    throw redirect({ to: getRoleHome(context.user.roles[0]) })
  },
})

// 403 应用级页面：无导航外壳，套空白布局即可（与具体业务无关，故在聚合层声明）
const forbiddenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/403',
  component: () => (
    <BlankLayout>
      <ForbiddenPage />
    </BlankLayout>
  ),
})

// 路由聚合：核心只是把「公共路由 + 各角色模块导出的子树」拼起来，不认识具体角色
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  forbiddenRoute,
  studentRouteTree,
  teacherRouteTree,
  adminRouteTree,
])

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFoundPage,
  // 守卫 beforeLoad 为 async（首次需探测登录态），加载超过阈值时显示 Spinner，避免白屏
  defaultPendingComponent: () => (
    <div className="grid min-h-full place-items-center">
      <Spinner className="size-6" />
    </div>
  ),
  defaultPreload: 'intent',
})

// 让 Link / navigate / getRouteApi 获得全局类型推导
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
