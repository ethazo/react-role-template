import { ChevronsUpDownIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { useAuth } from '@/shared/auth/useAuth'
import { ROLES } from '@/config/roles'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** 取头像占位文字：优先取姓名后两位（中文名习惯），英文则取首字母 */
function initials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '?'
  if (/[一-龥]/.test(trimmed)) return trimmed.slice(-2)
  return trimmed.slice(0, 2).toUpperCase()
}

/** 品牌渐变头像（消费级质感，区别于灰底占位） */
function GradientAvatar({ name, size }: { name: string; size?: 'sm' | 'default' | 'lg' }) {
  return (
    <Avatar size={size}>
      <AvatarFallback className="bg-gradient-to-br from-primary to-brand-accent font-medium text-primary-foreground">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

/**
 * 用户菜单（shadcn DropdownMenu 承载行为，视觉为自定义「柔和身份卡」）。
 *
 * 行为（键盘上下键/typeahead、焦点进出与归还、贴边翻转、portal 防裁切、点外部/Esc 关闭）
 * 全部来自底层 Radix，无需手写维护；外观完全由下方 className 决定，与 shadcn 默认样式无关：
 * 品牌渐变头像 + 圆角内卡片承托姓名与角色，菜单项走大圆角软高亮，偏消费级 App 质感。
 *
 * - variant="avatar"：顶栏只放一个渐变头像圆，hover/focus 显细环
 * - variant="full"：侧边栏底部宽块，向上弹出，仅管理端用
 */
export function UserMenu({ variant = 'avatar' }: { variant?: 'avatar' | 'full' }) {
  const { user, logout } = useAuth()
  if (!user) return null

  const roleLabels = user.roles.map((r) => ROLES[r].label).join('、')

  const trigger =
    variant === 'full' ? (
      <button className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left outline-hidden transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring">
        <GradientAvatar name={user.name} size="sm" />
        <span className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate text-sm font-medium">{user.name}</span>
          <span className="truncate text-xs text-sidebar-foreground/70">{roleLabels}</span>
        </span>
        <ChevronsUpDownIcon className="size-4 shrink-0 text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden" />
      </button>
    ) : (
      <button
        className="rounded-full ring-offset-2 ring-offset-background outline-hidden transition hover:ring-2 hover:ring-border focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="用户菜单"
      >
        <GradientAvatar name={user.name} />
      </button>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={variant === 'full' ? 'top' : 'bottom'}
        align={variant === 'full' ? 'start' : 'end'}
        sideOffset={10}
        className="w-72 rounded-2xl p-2 shadow-xl"
      >
        {/* 身份卡：渐变头像 + 姓名 + 角色 chip，圆角内卡片承托 */}
        <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
          <GradientAvatar name={user.name} size="lg" />
          <div className="grid min-w-0 flex-1 gap-1 leading-tight">
            <span className="truncate text-sm font-semibold text-foreground">{user.name}</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-flex h-5 items-center rounded-full bg-primary/10 px-2 text-xs font-medium text-primary">
                {roleLabels}
              </span>
              {user.username && (
                <span className="truncate text-xs text-muted-foreground">@{user.username}</span>
              )}
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-0.5">
          <DropdownMenuItem className="gap-3 rounded-xl px-3 py-2.5 font-medium [&_svg]:text-muted-foreground">
            <UserIcon className="size-[1.05rem]" />
            <span>个人信息</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-3 rounded-xl px-3 py-2.5 font-medium [&_svg]:text-muted-foreground"
            disabled
          >
            <SettingsIcon className="size-[1.05rem]" />
            <span>账号设置</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="mx-2 my-1.5" />

        <DropdownMenuItem
          className="gap-3 rounded-xl px-3 py-2.5 font-medium"
          variant="destructive"
          onClick={logout}
        >
          <LogOutIcon className="size-[1.05rem]" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
