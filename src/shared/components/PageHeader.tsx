import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * 统一的内容区页头：标题 + 描述 + 右侧操作区。
 * 三端内容页共用，保证标题排版、间距一致（设计语言统一）。
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
