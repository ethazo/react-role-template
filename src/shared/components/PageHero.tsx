import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * 渐变柔光横幅：三端首页统一的「有人味的头」。
 *
 * 底色走身份双色渐变 from-primary to-brand-accent（科技蓝 → 医疗青绿），叠两团模糊柔光，
 * 是「活力年轻教育风」的标志性元素。可内嵌一行关键数字（stats），让看板「先有温度再有数据」。
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  stats,
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  stats?: { label: string; value: string; icon?: LucideIcon }[]
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-brand-accent px-6 py-7 text-primary-foreground sm:px-8 sm:py-8',
        className,
      )}
    >
      {/* 装饰柔光 */}
      <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute right-32 -bottom-20 size-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          {eyebrow && <p className="text-sm font-medium text-primary-foreground/80">{eyebrow}</p>}
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description && (
            <p className="max-w-xl text-sm text-primary-foreground/85">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>

      {stats && stats.length > 0 && (
        <div className="relative mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              {s.icon && (
                <span className="grid size-9 place-items-center rounded-xl bg-white/15">
                  <s.icon className="size-[1.1rem]" />
                </span>
              )}
              <div className="leading-tight">
                <p className="font-heading text-lg font-bold tracking-tight tabular-nums">
                  {s.value}
                </p>
                <p className="text-xs text-primary-foreground/75">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
