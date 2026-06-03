import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 p-10 text-center">
      <p className="text-5xl font-bold text-muted-foreground">404</p>
      <p className="text-muted-foreground">页面不存在</p>
      <Link to="/" className="text-sm text-primary hover:underline">
        返回首页
      </Link>
    </div>
  )
}
