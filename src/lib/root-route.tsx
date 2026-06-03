import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

/** 路由上下文：守卫 (beforeLoad) 借此拿到 queryClient 预取 /me */
export interface RouterContext {
  queryClient: QueryClient
}

/**
 * 根路由（路由内核）。
 * 放在 lib/ 而非 app/：各 feature 的路由子树都要以它为 parent，
 * 若放 app/ 会迫使 feature 反向依赖组合根。它本身是“配好的路由库”，与 lib/react-query 同性质。
 * 404 兜底交给 app/router 的 defaultNotFoundComponent，使本文件零 UI 依赖。
 */
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
})
