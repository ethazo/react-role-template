import { UsersIcon, ActivityIcon, AlertTriangleIcon, CheckCircle2Icon } from 'lucide-react'
import { ProfileCard } from '@/shared/components/ProfileCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/** 概览统计卡：演示品牌色 + 状态色（success/warning/info）在真实页面里的用法 */
const STATS = [
  { label: '在册用户', value: '12,840', icon: UsersIcon, tone: 'primary' },
  { label: '今日活跃', value: '3,219', icon: ActivityIcon, tone: 'info' },
  { label: '待处理事项', value: '27', icon: AlertTriangleIcon, tone: 'warning' },
  { label: '系统正常率', value: '99.98%', icon: CheckCircle2Icon, tone: 'success' },
] as const

const TONE: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/15 text-warning',
  success: 'bg-success/10 text-success',
}

export function AdminHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">系统概览</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, tone }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <span className={`grid size-9 place-items-center rounded-lg ${TONE[tone]}`}>
                <Icon className="size-5" />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums text-foreground">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProfileCard />
    </div>
  )
}
