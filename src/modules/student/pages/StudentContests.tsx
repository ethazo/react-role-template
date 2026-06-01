import { CalendarIcon, MedalIcon, TrophyIcon, UsersRoundIcon } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { SectionCard } from '@/shared/components/SectionCard'
import { tintByIndex } from '@/shared/ui/tints'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Contest = {
  name: string
  desc: string
  level: '入门' | '进阶' | '挑战'
  status: '报名中' | '进行中' | '已结束'
  date: string
  members: number
}

/** 示例数据：接入业务后由接口替换。 */
const contests: Contest[] = [
  {
    name: '全国大学生临床技能竞赛',
    desc: '面向临床医学专业，考核问诊、查体与操作综合能力',
    level: '挑战',
    status: '报名中',
    date: '06-15 截止',
    members: 1280,
  },
  {
    name: '基础医学创新研究大赛',
    desc: '聚焦基础医学实验设计与科研创新，三人组队',
    level: '进阶',
    status: '进行中',
    date: '剩余 2 天',
    members: 326,
  },
  {
    name: '人体解剖绘图大赛',
    desc: '零基础友好，考核解剖结构辨识与绘图表达',
    level: '入门',
    status: '报名中',
    date: '06-20 截止',
    members: 540,
  },
  {
    name: '临床思维辩论赛',
    desc: '围绕真实病例展开诊疗思路辩论',
    level: '挑战',
    status: '已结束',
    date: '05-10 结束',
    members: 210,
  },
]

const levelStyle: Record<Contest['level'], string> = {
  入门: 'bg-success/10 text-success',
  进阶: 'bg-primary/10 text-primary',
  挑战: 'bg-brand-accent/14 text-brand-accent',
}

const ranking = [
  { rank: 1, name: '林思源', score: 2980 },
  { rank: 2, name: '周子涵', score: 2864 },
  { rank: 3, name: '我', score: 2710, me: true },
]

export function StudentContests() {
  return (
    <div className="space-y-6">
      <PageHeader title="竞赛中心" description="参与竞赛，检验所学，争夺荣誉榜。" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {contests.map((c, i) => (
            <div
              key={c.name}
              className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
            >
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm ${tintByIndex(i).grad}`}
              >
                <TrophyIcon className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading font-medium text-foreground">{c.name}</h3>
                  <span
                    className={`inline-flex h-5 items-center rounded-full px-2 text-xs font-medium ${levelStyle[c.level]}`}
                  >
                    {c.level}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="size-3.5" /> {c.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UsersRoundIcon className="size-3.5" /> {c.members} 人参与
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                <Badge
                  variant={
                    c.status === '进行中'
                      ? 'default'
                      : c.status === '报名中'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {c.status}
                </Badge>
                <Button
                  size="sm"
                  variant={c.status === '已结束' ? 'outline' : 'default'}
                  disabled={c.status === '已结束'}
                >
                  {c.status === '进行中'
                    ? '进入比赛'
                    : c.status === '报名中'
                      ? '立即报名'
                      : '查看结果'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 个人排名 */}
        <aside className="space-y-6">
          <SectionCard icon={MedalIcon} title="本月荣誉榜" padded>
            <ul className="space-y-2">
              {ranking.map((r) => (
                <li
                  key={r.rank}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 ${r.me ? 'bg-primary/10' : ''}`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      r.rank <= 3
                        ? 'bg-gradient-to-br from-primary to-brand-accent text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {r.rank}
                  </span>
                  <span
                    className={`flex-1 truncate text-sm ${r.me ? 'font-semibold text-primary' : 'text-foreground'}`}
                  >
                    {r.name}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground tabular-nums">
                    {r.score}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-muted/60 px-3 py-2 text-center text-xs text-muted-foreground">
              再得 <span className="font-semibold text-foreground">154</span> 分即可进入前二
            </p>
          </SectionCard>
        </aside>
      </div>
    </div>
  )
}
