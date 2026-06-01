import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  LayoutDashboardIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  CalendarIcon,
  BarChart3Icon,
  SettingsIcon,
  ShieldIcon,
  FileTextIcon,
  TrophyIcon,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 导航图标注册表：把 NavMeta.icon 的「字符串 key」映射到 lucide 组件。
 *
 * 为什么用字符串 key 而不是直接传组件？
 * —— 保持「路由声明（routes.tsx / config）只写数据、不 import 组件」的解耦哲学，
 *    与 config/roles.ts、NavMeta 一脉相承。各布局拿到 key 后自行决定怎么渲染。
 *
 * 新增图标：在这里加一行映射即可；routes.tsx 里写对应 key。
 */
const REGISTRY: Record<string, LucideIcon> = {
  home: HomeIcon,
  dashboard: LayoutDashboardIcon,
  overview: BarChart3Icon,
  courses: BookOpenIcon,
  contests: TrophyIcon,
  users: UsersIcon,
  students: GraduationCapIcon,
  assignments: ClipboardListIcon,
  grades: FileTextIcon,
  schedule: CalendarIcon,
  roles: ShieldIcon,
  settings: SettingsIcon,
}

/**
 * 渲染一个导航图标。
 * - key 命中注册表 → 渲染对应 lucide 图标
 * - 未命中（如 emoji 或任意文本）→ 原样作为文本渲染（向后兼容）
 * - 无 key → 不渲染
 */
export function NavIcon({ name, className }: { name?: string; className?: string }) {
  if (!name) return null
  const Icon = REGISTRY[name]
  if (Icon) return <Icon className={cn('size-4 shrink-0', className)} aria-hidden />
  return <span className={cn('inline-flex shrink-0', className)}>{name}</span>
}
