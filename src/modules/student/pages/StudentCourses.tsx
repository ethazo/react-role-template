import { BookOpenIcon, CheckCircle2Icon, PlayIcon, UserRoundIcon } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { tintByIndex } from '@/shared/ui/tints'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Course = {
  name: string
  teacher: string
  lessons: number
  progress: number
  status: 'ongoing' | 'done'
}

/** 示例数据：接入业务后由接口替换。 */
const courses: Course[] = [
  { name: '系统解剖学', teacher: '王志远 教授', lessons: 24, progress: 68, status: 'ongoing' },
  { name: '生理学', teacher: '李慧敏 教授', lessons: 18, progress: 45, status: 'ongoing' },
  { name: '诊断学', teacher: '陈国华 主任医师', lessons: 32, progress: 82, status: 'ongoing' },
  { name: '医学免疫学', teacher: '周敏 副教授', lessons: 16, progress: 100, status: 'done' },
  { name: '组织胚胎学', teacher: '赵明轩 教授', lessons: 20, progress: 100, status: 'done' },
]

function CourseCard({ course, index }: { course: Course; index: number }) {
  const done = course.status === 'done'
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70 transition-shadow hover:shadow-md">
      <div className={`relative h-28 ${tintByIndex(index).grad}`}>
        <span className="absolute top-3 right-3">
          {done ? (
            <Badge className="bg-white/90 text-success">
              <CheckCircle2Icon /> 已完成
            </Badge>
          ) : (
            <Badge className="bg-white/90 text-primary">学习中</Badge>
          )}
        </span>
        <BookOpenIcon className="absolute bottom-3 left-4 size-7 text-white/85" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-heading font-medium text-foreground">{course.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <UserRoundIcon className="size-3.5" /> {course.teacher} · 共 {course.lessons} 课时
          </p>
        </div>
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>学习进度</span>
            <span className="font-medium text-foreground">{course.progress}%</span>
          </div>
          <Progress value={course.progress} />
        </div>
        <Button variant={done ? 'outline' : 'default'} size="sm" className="w-full">
          <PlayIcon /> {done ? '复习课程' : '继续学习'}
        </Button>
      </div>
    </div>
  )
}

function Grid({ list }: { list: Course[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((c) => (
        <CourseCard key={c.name} course={c} index={courses.indexOf(c)} />
      ))}
    </div>
  )
}

export function StudentCourses() {
  const ongoing = courses.filter((c) => c.status === 'ongoing')
  const done = courses.filter((c) => c.status === 'done')

  return (
    <div className="space-y-6">
      <PageHeader title="我的课程" description="共选修 5 门课程，3 门进行中。" />
      <Tabs defaultValue="ongoing" className="gap-5">
        <TabsList>
          <TabsTrigger value="ongoing">进行中（{ongoing.length}）</TabsTrigger>
          <TabsTrigger value="done">已完成（{done.length}）</TabsTrigger>
          <TabsTrigger value="all">全部（{courses.length}）</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <Grid list={ongoing} />
        </TabsContent>
        <TabsContent value="done">
          <Grid list={done} />
        </TabsContent>
        <TabsContent value="all">
          <Grid list={courses} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
