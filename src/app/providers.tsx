import { lazy, Suspense } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { router } from './router'
import { queryClient } from '@/lib/react-query'
import { authKeys } from '@/lib/auth'
import { setUnauthorizedHandler } from '@/lib/api-client'
import { AppErrorFallback } from '@/components/errors/AppErrorFallback'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

// 把「401 → 清登录态 + 跳登录」的逻辑注入请求层。
// 请求层本身不依赖路由，这样「请求骨架」与「导航外观」保持解耦。
setUnauthorizedHandler(() => {
  queryClient.removeQueries({ queryKey: authKeys.me })
  void router.navigate({ to: '/login' })
})

// 调试面板仅开发期按需加载：生产构建下 PROD 恒真，对应 chunk 不会被打包。
const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })),
    )
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )

export function App() {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
        <Toaster />
        <Suspense>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
          <TanStackRouterDevtools router={router} position="bottom-right" />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
