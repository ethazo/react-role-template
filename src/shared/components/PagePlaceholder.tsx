import { ConstructionIcon, type LucideIcon } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'

/**
 * 「功能建设中」占位骨架：给尚未实现的路由一个有意图的空状态，
 * 而不是一片空白。业务页面落地后用真实内容替换即可。
 */
export function PagePlaceholder({
  title = '功能建设中',
  description = '该模块的页面框架已就绪，业务内容待接入。',
  icon: Icon = ConstructionIcon,
  children,
}: {
  title?: string
  description?: string
  icon?: LucideIcon
  children?: React.ReactNode
}) {
  return (
    <Empty className="min-h-80 border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  )
}
