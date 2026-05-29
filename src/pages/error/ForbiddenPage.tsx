import { Link } from '@tanstack/react-router'

export function ForbiddenPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 p-10 text-center">
      <p className="text-5xl font-bold text-muted-foreground">403</p>
      <p className="text-muted-foreground">无权访问该页面</p>
      <Link to="/" className="text-sm text-primary hover:underline">
        返回首页
      </Link>
    </div>
  )
}
