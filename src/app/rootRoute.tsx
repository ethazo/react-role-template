import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { NotFoundPage } from '@/pages/error/NotFoundPage'

/** 路由上下文：守卫 (beforeLoad) 借此拿到 queryClient 预取 /me */
export interface RouterContext {
  queryClient: QueryClient
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
})
