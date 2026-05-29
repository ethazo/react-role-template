import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

/**
 * 应用级运行时错误兜底（react-error-boundary 的 fallback）。
 * 与路由级 ErrorPage 互补：ErrorPage 接管 loader/路由抛错，
 * 这里接管组件渲染期未被捕获的异常，避免整页白屏。
 */
export function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-10 text-center">
      <p className="text-5xl font-bold text-muted-foreground">出错了</p>
      <p className="max-w-md text-muted-foreground">
        {error instanceof Error ? error.message : '发生未知错误'}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={resetErrorBoundary}>
          重试
        </Button>
        <Button onClick={() => window.location.reload()}>刷新页面</Button>
      </div>
    </div>
  )
}
