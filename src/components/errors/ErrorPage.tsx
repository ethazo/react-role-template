import type { ErrorComponentProps } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

/** 路由级错误兜底 */
export function ErrorPage({ error }: ErrorComponentProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-10 text-center">
      <p className="text-5xl font-bold text-muted-foreground">出错了</p>
      <p className="max-w-md text-muted-foreground">{error.message || '发生未知错误'}</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        刷新重试
      </Button>
    </div>
  )
}
