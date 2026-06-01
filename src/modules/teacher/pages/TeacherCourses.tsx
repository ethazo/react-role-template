import { MoreHorizontalIcon, PlusIcon, SearchIcon, UsersRoundIcon } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { tintByIndex } from '@/shared/ui/tints'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

type TeacherCourse = {
  name: string
  cls: string
  students: number
  progress: number
  status: '进行中' | '已结课' | '未开课'
}

/** 示例数据：接入业务后由接口替换。 */
const list: TeacherCourse[] = [
  { name: '系统解剖学', cls: '临床医学 2301', students: 48, progress: 68, status: '进行中' },
  { name: '生理学', cls: '临床医学 2302', students: 52, progress: 45, status: '进行中' },
  { name: '临床技能实训', cls: '实验班', students: 24, progress: 30, status: '进行中' },
  { name: '诊断学', cls: '临床医学 2401', students: 62, progress: 0, status: '未开课' },
  { name: '病理学', cls: '临床医学 2201', students: 45, progress: 100, status: '已结课' },
]

const statusVariant: Record<TeacherCourse['status'], 'default' | 'secondary' | 'outline'> = {
  进行中: 'default',
  未开课: 'secondary',
  已结课: 'outline',
}

export function TeacherCourses() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="我的课程"
        description="管理你负责的课程、班级与教学进度。"
        actions={
          <Button size="sm">
            <PlusIcon /> 新建课程
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <div className="relative w-full max-w-xs">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="搜索课程或班级" className="pl-8" />
          </div>
          <span className="ml-auto text-sm text-muted-foreground">共 {list.length} 门</span>
        </div>

        <ul className="divide-y divide-border">
          {list.map((c, i) => (
            <li
              key={c.name}
              className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-2xl text-base font-bold text-white shadow-sm ${tintByIndex(i).grad}`}
              >
                {c.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-foreground">{c.name}</p>
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  {c.cls} · <UsersRoundIcon className="size-3.5" /> {c.students} 名学生
                </p>
              </div>
              <div className="w-full shrink-0 sm:w-40">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>进度</span>
                  <span className="font-medium text-foreground">{c.progress}%</span>
                </div>
                <Progress value={c.progress} className="mt-1.5" />
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="outline" size="sm">
                  管理
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="更多操作">
                  <MoreHorizontalIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
