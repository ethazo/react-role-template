import { Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  CalendarClockIcon,
  ClockIcon,
  FlameIcon,
  PlayCircleIcon,
  TrophyIcon,
} from 'lucide-react'
import { useAuth } from '@/shared/auth/useAuth'
import { PageHero } from '@/shared/components/PageHero'
import { SectionCard } from '@/shared/components/SectionCard'
import { tintByIndex } from '@/shared/ui/tints'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

/** 示例数据：接入业务后由接口替换。 */
const ongoing = [
  { name: '系统解剖学', teacher: '王志远 教授', progress: 68, next: '第 9 章 · 颅脑断层解剖' },
  { name: '生理学', teacher: '李慧敏 教授', progress: 45, next: '第 6 章 · 神经元的兴奋传导' },
  { name: '诊断学', teacher: '陈国华 主任医师', progress: 82, next: '第 11 章 · 心脏听诊' },
]

const schedule = [
  { time: '08:30', course: '系统解剖学', room: '解剖实验楼 A301', now: true },
  { time: '10:20', course: '生理学', room: '第一教学楼 B210', now: false },
  { time: '14:00', course: '临床技能实训', room: '临床技能中心 3', now: false },
]

const contests = [
  { name: '全国大学生临床技能竞赛', tag: '报名中', days: 6 },
  { name: '人体解剖绘图大赛', tag: '进行中', days: 2 },
]

export function StudentHome() {
  const { user } = useAuth()
  const firstName = user?.name ?? '同学'

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="欢迎回来"
        title={`${firstName}，今天也要加油 👋`}
        description="你本周已学习 6.5 小时，还有 2 项作业待完成，继续保持节奏。"
        actions={
          <Button
            asChild
            variant="secondary"
            className="h-10 bg-white text-primary hover:bg-white/90"
          >
            <Link to="/student/courses">
              <PlayCircleIcon /> 继续学习
            </Link>
          </Button>
        }
        stats={[
          { label: '连续打卡', value: '12 天', icon: FlameIcon },
          { label: '本周学习', value: '6.5 h', icon: ClockIcon },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 进行中的课程 */}
        <section className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">进行中的课程</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/student/courses">
                全部 <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {ongoing.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70 transition-shadow hover:shadow-md"
              >
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-bold text-white shadow-sm ${tintByIndex(i).grad}`}
                >
                  {c.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium text-foreground">{c.name}</p>
                    <span className="shrink-0 text-sm font-medium text-muted-foreground">
                      {c.progress}%
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {c.teacher} · 下一节：{c.next}
                  </p>
                  <Progress value={c.progress} className="mt-2.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 侧栏 */}
        <aside className="space-y-6">
          <SectionCard icon={CalendarClockIcon} title="今日课表" padded>
            <ul className="space-y-3">
              {schedule.map((s) => (
                <li key={s.time} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-sm font-medium text-muted-foreground tabular-nums">
                    {s.time}
                  </span>
                  <span
                    className={`h-8 w-1 shrink-0 rounded-full ${s.now ? 'bg-gradient-to-b from-primary to-brand-accent' : 'bg-border'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{s.course}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.room}</p>
                  </div>
                  {s.now && <Badge>进行中</Badge>}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard icon={TrophyIcon} title="竞赛公告" padded>
            <ul className="space-y-2.5">
              {contests.map((c) => (
                <li key={c.name}>
                  <Link
                    to="/student/contests"
                    className="-mx-2 flex items-center justify-between gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">距截止 {c.days} 天</p>
                    </div>
                    <Badge variant={c.tag === '进行中' ? 'default' : 'secondary'}>{c.tag}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        </aside>
      </div>
    </div>
  )
}
