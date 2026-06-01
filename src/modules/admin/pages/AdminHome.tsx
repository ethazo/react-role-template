import { Link } from '@tanstack/react-router'
import {
  ActivityIcon,
  ArrowRightIcon,
  BookOpenIcon,
  FileTextIcon,
  GraduationCapIcon,
  SettingsIcon,
  TrophyIcon,
  UploadIcon,
  UsersRoundIcon,
  type LucideIcon,
} from 'lucide-react'
import { PageHero } from '@/shared/components/PageHero'
import { SectionCard } from '@/shared/components/SectionCard'
import { StatCard } from '@/shared/components/StatCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Tone = 'primary' | 'accent' | 'success' | 'warning'

const toneSoft: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-brand-accent/14 text-brand-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
}

/** 示例数据：接入业务后由接口替换。单位统一为「日活跃用户（人）」。 */
const trend = [
  { label: '一', active: 1240 },
  { label: '二', active: 1560 },
  { label: '三', active: 1700 },
  { label: '四', active: 1420 },
  { label: '五', active: 1880 },
  { label: '六', active: 960 },
  { label: '日', active: 800 },
]
const maxActive = Math.max(...trend.map((d) => d.active))
const peakDay = trend.reduce((a, b) => (b.active > a.active ? b : a))

const activities: { who: string; what: string; when: string; icon: LucideIcon; tone: Tone }[] = [
  {
    who: '李慧敏',
    what: '创建了课程《系统解剖学》',
    when: '10 分钟前',
    icon: BookOpenIcon,
    tone: 'primary',
  },
  {
    who: '系统',
    what: '「全国大学生临床技能竞赛」已开始报名',
    when: '1 小时前',
    icon: TrophyIcon,
    tone: 'accent',
  },
  {
    who: '王志远',
    what: '发布了《诊断学》第 8 次作业',
    when: '3 小时前',
    icon: FileTextIcon,
    tone: 'success',
  },
  {
    who: '管理员',
    what: '导入了 2024 级临床医学新生账号 320 个',
    when: '昨天 16:20',
    icon: UploadIcon,
    tone: 'warning',
  },
]

const deptDist: { label: string; count: number; pct: number; bar: string }[] = [
  { label: '临床医学院', count: 1180, pct: 47, bar: 'bg-primary' },
  { label: '护理学院', count: 612, pct: 25, bar: 'bg-brand-accent' },
  { label: '基础医学院', count: 426, pct: 17, bar: 'bg-success' },
  { label: '口腔/药学等', count: 268, pct: 11, bar: 'bg-warning' },
]

export function AdminHome() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="管理控制台"
        title="平台运行概览"
        description="今日新增 2024 级临床医学新生 320 名，3 场技能竞赛进行中。"
        stats={[
          { label: '用户总数', value: '2,486', icon: UsersRoundIcon },
          { label: '在线课程', value: '148', icon: BookOpenIcon },
          { label: '进行中竞赛', value: '6', icon: TrophyIcon },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={UsersRoundIcon}
          label="用户总数"
          value="2,486"
          trend={{ value: '5.2%', up: true }}
          tone="primary"
        />
        <StatCard
          icon={GraduationCapIcon}
          label="活跃学生"
          value="1,932"
          trend={{ value: '3.1%', up: true }}
          tone="success"
        />
        <StatCard
          icon={BookOpenIcon}
          label="在线课程"
          value="148"
          hint="本月新增 12"
          tone="accent"
        />
        <StatCard
          icon={TrophyIcon}
          label="进行中竞赛"
          value="6"
          trend={{ value: '1', up: false }}
          tone="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* 趋势图（纯 CSS 柱状，无额外依赖） */}
        <SectionCard
          title="本周活跃趋势"
          action={<Badge variant="secondary">日活跃用户（人）</Badge>}
          className="lg:col-span-3"
        >
          <p className="mb-6 text-xs text-muted-foreground">
            峰值 周{peakDay.label}{' '}
            <span className="font-medium text-foreground">{peakDay.active.toLocaleString()}</span>{' '}
            人
          </p>
          <div className="relative">
            {/* 背景基准网格线 */}
            <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-t border-dashed border-border/70" />
              ))}
            </div>
            <div className="relative flex h-48 items-end justify-between gap-2 sm:gap-3">
              {trend.map((d) => {
                const peak = d.active === maxActive
                return (
                  <div
                    key={d.label}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  >
                    <span
                      className={cn(
                        'text-xs font-medium tabular-nums transition-colors',
                        peak ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {d.active.toLocaleString()}
                    </span>
                    <div
                      className={cn(
                        'w-full max-w-10 rounded-t-lg bg-gradient-to-t transition-all',
                        peak
                          ? 'from-primary to-brand-accent'
                          : 'from-primary/55 to-primary/85 group-hover:from-primary group-hover:to-brand-accent',
                      )}
                      style={{ height: `${(d.active / maxActive) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{d.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </SectionCard>

        {/* 最近动态（时间线） */}
        <SectionCard icon={ActivityIcon} title="最近动态" className="lg:col-span-2">
          <ul>
            {activities.map((a, i) => (
              <li key={i} className="relative flex gap-3 pb-5 last:pb-0">
                {i < activities.length - 1 && (
                  <span className="absolute top-9 bottom-0 left-[15px] w-px bg-border" />
                )}
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full',
                    toneSoft[a.tone],
                  )}
                >
                  <a.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{a.who}</span> {a.what}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* 院系人数分布 */}
        <SectionCard title="院系人数分布" className="lg:col-span-3">
          {/* 合计占比条 */}
          <div className="flex h-2.5 w-full overflow-hidden rounded-full">
            {deptDist.map((r) => (
              <div key={r.label} className={r.bar} style={{ width: `${r.pct}%` }} />
            ))}
          </div>
          <ul className="mt-4 space-y-3">
            {deptDist.map((r) => (
              <li key={r.label} className="flex items-center gap-3 text-sm">
                <span className={cn('size-2.5 shrink-0 rounded-full', r.bar)} />
                <span className="flex-1 text-foreground">{r.label}</span>
                <span className="text-muted-foreground tabular-nums">
                  {r.count.toLocaleString()}
                </span>
                <span className="w-10 text-right font-medium text-foreground tabular-nums">
                  {r.pct}%
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* 快捷操作 */}
        <SectionCard title="快捷操作" className="lg:col-span-2">
          <div className="grid gap-2">
            <Button asChild variant="outline" className="justify-between">
              <Link to="/admin/users" search={{ page: 1, pageSize: 10 }}>
                <span className="flex items-center gap-2">
                  <UsersRoundIcon className="size-4 text-muted-foreground" /> 用户管理
                </span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/admin/settings">
                <span className="flex items-center gap-2">
                  <SettingsIcon className="size-4 text-muted-foreground" /> 系统设置
                </span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
