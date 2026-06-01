import {
  BookOpenIcon,
  CheckIcon,
  ClipboardCheckIcon,
  ClockIcon,
  GraduationCapIcon,
  UsersRoundIcon,
} from 'lucide-react'
import { useAuth } from '@/shared/auth/useAuth'
import { PageHero } from '@/shared/components/PageHero'
import { SectionCard } from '@/shared/components/SectionCard'
import { StatCard } from '@/shared/components/StatCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/** 示例数据：接入业务后由接口替换。 */
const todos = [
  { title: '批改《系统解剖学》第 8 次作业', count: '32 份待批', urgent: true },
  { title: '审核「临床技能竞赛」参赛名单', count: '12 人待审', urgent: true },
  { title: '上传《生理学》课件', count: '第 7 章', urgent: false },
  { title: '回复课程讨论区提问', count: '5 条新消息', urgent: false },
]

const lessons = [
  {
    time: '08:30 - 10:00',
    course: '系统解剖学',
    cls: '临床医学 2301 班',
    room: '解剖实验楼 A301',
    now: true,
  },
  {
    time: '10:20 - 11:50',
    course: '生理学',
    cls: '临床医学 2302 班',
    room: '第一教学楼 B210',
    now: false,
  },
  {
    time: '14:00 - 15:30',
    course: '临床技能实训',
    cls: '实验班',
    room: '临床技能中心 3',
    now: false,
  },
]

export function TeacherHome() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="工作台"
        title={`${user?.name ?? '老师'}，开始一天的教学吧`}
        description="今天有 3 节课、44 份作业待批改，2 项临近截止。"
        stats={[
          { label: '今日课时', value: '3 节', icon: ClockIcon },
          { label: '待批作业', value: '44 份', icon: ClipboardCheckIcon },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpenIcon} label="授课课程" value="4" hint="本学期" tone="primary" />
        <StatCard
          icon={UsersRoundIcon}
          label="学生总数"
          value="186"
          trend={{ value: '8', up: true }}
          tone="success"
        />
        <StatCard
          icon={ClipboardCheckIcon}
          label="待批作业"
          value="44"
          hint="2 项临近截止"
          tone="warning"
        />
        <StatCard icon={ClockIcon} label="本周课时" value="12" hint="共 18 学时" tone="accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* 待办 */}
        <SectionCard
          title="待办事项"
          action={<Badge variant="secondary">{todos.length} 项</Badge>}
          className="lg:col-span-3"
        >
          <ul className="divide-y divide-border">
            {todos.map((t) => (
              <li key={t.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                    t.urgent
                      ? 'bg-brand-accent/14 text-brand-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <ClipboardCheckIcon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.count}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <CheckIcon /> 处理
                </Button>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* 今日课表 */}
        <SectionCard icon={GraduationCapIcon} title="今日课表" className="lg:col-span-2">
          <ol className="space-y-3">
            {lessons.map((l) => (
              <li
                key={l.time}
                className={`rounded-xl border p-3 ${
                  l.now ? 'border-primary/40 bg-primary/5' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground tabular-nums">
                    {l.time}
                  </span>
                  {l.now && <Badge>进行中</Badge>}
                </div>
                <p className="mt-1 text-sm font-medium text-foreground">{l.course}</p>
                <p className="text-xs text-muted-foreground">
                  {l.cls} · {l.room}
                </p>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>
    </div>
  )
}
