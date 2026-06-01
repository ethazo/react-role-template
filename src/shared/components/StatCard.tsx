import type { LucideIcon } from 'lucide-react'
import { ArrowDownRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 指标统计卡：教师工作台 / 管理员看板复用。
 * 圆润大圆角 + 柔和阴影；左侧渐变图标块 + 大号数值，右上角可选同比变化（绿涨红跌）。
 * tone 决定图标块的渐变与底色，对应身份/状态语义。
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  tone = 'primary',
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  trend?: { value: string; up: boolean }
  tone?: 'primary' | 'accent' | 'success' | 'warning'
}) {
  const toneGrad = {
    primary: 'bg-gradient-to-br from-primary to-brand-accent text-primary-foreground',
    accent: 'bg-gradient-to-br from-brand-accent to-teal-400 text-brand-accent-foreground',
    success: 'bg-gradient-to-br from-success to-emerald-400 text-success-foreground',
    warning: 'bg-gradient-to-br from-warning to-amber-300 text-warning-foreground',
  }[tone]

  return (
    <div className="group flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70 transition-shadow hover:shadow-md hover:shadow-foreground/[0.06]">
      <span
        className={cn(
          'grid size-12 shrink-0 place-items-center rounded-2xl shadow-sm transition-transform group-hover:scale-105',
          toneGrad,
        )}
      >
        <Icon className="size-[1.4rem]" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                trend.up ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
              )}
            >
              {trend.up ? (
                <ArrowUpRightIcon className="size-3" />
              ) : (
                <ArrowDownRightIcon className="size-3" />
              )}
              {trend.value}
            </span>
          )}
        </div>
        <p className="mt-1 font-heading text-[1.75rem] leading-tight font-bold tracking-tight text-foreground">
          {value}
        </p>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  )
}
