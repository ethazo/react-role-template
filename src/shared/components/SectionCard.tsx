import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * 统一的内容卡片：圆润大圆角 + 柔和阴影 + 极淡描边，替代各页重复手写的
 * `rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10`。
 *
 * 可选头部：左侧图标色块 + 标题/描述，右侧操作区（action）。不传 title 时即为「裸卡」，
 * 自行在 children 里排版。padding 默认开启，传 padded={false} 可自定义内边距（如表格贴边）。
 */
export function SectionCard({
  icon: Icon,
  title,
  description,
  action,
  children,
  padded = true,
  className,
  bodyClassName,
}: {
  icon?: LucideIcon
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  children?: ReactNode
  padded?: boolean
  className?: string
  bodyClassName?: string
}) {
  const hasHeader = title || action
  return (
    <section
      className={cn(
        'overflow-hidden rounded-2xl bg-card shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70',
        className,
      )}
    >
      {hasHeader && (
        <div className={cn('flex items-start justify-between gap-3', padded ? 'p-5 pb-0' : 'p-5')}>
          <div className="flex items-start gap-3">
            {Icon && (
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-[1.15rem]" />
              </span>
            )}
            {title && (
              <div className="min-w-0">
                <h2 className="font-heading text-base font-semibold text-foreground">{title}</h2>
                {description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>
          {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={cn(padded && 'p-5', hasHeader && padded && 'pt-4', bodyClassName)}>
        {children}
      </div>
    </section>
  )
}
