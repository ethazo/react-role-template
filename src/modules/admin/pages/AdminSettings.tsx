import { InfoIcon, SlidersHorizontalIcon } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { SectionCard } from '@/shared/components/SectionCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

/** 示例配置项：接入业务后由接口/表单状态驱动。danger 标记需谨慎操作的开关。 */
const toggles = [
  { id: 'reg', title: '开放自助注册', desc: '允许校内邮箱自助注册账号', on: false, danger: false },
  { id: 'contest', title: '竞赛模块', desc: '在学生端展示竞赛中心入口', on: true, danger: false },
  {
    id: 'notify',
    title: '邮件通知',
    desc: '作业、竞赛等事件发送邮件提醒',
    on: true,
    danger: false,
  },
  { id: 'maintain', title: '维护模式', desc: '开启后仅管理员可访问平台', on: false, danger: true },
]

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <PageHeader title="系统设置" description="配置平台基础信息与功能开关。" />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <SectionCard icon={InfoIcon} title="基础信息" description="平台对外展示的名称与联系方式">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site">平台名称</Label>
              <Input id="site" defaultValue="智学云" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">管理员邮箱</Label>
              <Input id="contact" type="email" defaultValue="admin@med.edu" />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" size="sm">
                重置
              </Button>
              <Button size="sm">保存更改</Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={SlidersHorizontalIcon}
          title="功能开关"
          description="控制各业务模块的启用状态"
        >
          <ul className="-my-1">
            {toggles.map((t) => (
              <li
                key={t.id}
                className={cn(
                  'flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors',
                  t.danger
                    ? 'bg-warning/5 ring-1 ring-warning/30 hover:bg-warning/10'
                    : 'hover:bg-muted/50',
                )}
              >
                <div className="min-w-0">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      t.danger ? 'text-warning' : 'text-foreground',
                    )}
                  >
                    {t.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch defaultChecked={t.on} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  )
}
