import { FilterIcon, SearchIcon } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Student = {
  name: string
  no: string
  cls: string
  attendance: number
  avg: number
  trend: '优秀' | '良好' | '待努力'
}

/** 示例数据：接入业务后由接口替换。 */
const students: Student[] = [
  { name: '林思源', no: '2301001', cls: '临床医学 2301', attendance: 98, avg: 92, trend: '优秀' },
  { name: '周子涵', no: '2301002', cls: '临床医学 2301', attendance: 95, avg: 88, trend: '良好' },
  { name: '陈奕迅', no: '2301003', cls: '临床医学 2301', attendance: 76, avg: 64, trend: '待努力' },
  { name: '王梓萱', no: '2302011', cls: '临床医学 2302', attendance: 100, avg: 95, trend: '优秀' },
  { name: '李俊杰', no: '2302012', cls: '临床医学 2302', attendance: 88, avg: 79, trend: '良好' },
  { name: '张铭轩', no: '2302013', cls: '临床医学 2302', attendance: 70, avg: 58, trend: '待努力' },
]

const trendStyle: Record<Student['trend'], string> = {
  优秀: 'bg-success/10 text-success',
  良好: 'bg-primary/10 text-primary',
  待努力: 'bg-warning/10 text-warning',
}

function initials(name: string) {
  return name.slice(-2)
}

export function TeacherStudents() {
  return (
    <div className="space-y-6">
      <PageHeader title="学生" description="查看所授班级学生的出勤与学业表现。" />

      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative w-full max-w-xs">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="搜索学生姓名或学号" className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <FilterIcon /> 班级筛选
          </Button>
          <span className="ml-auto text-sm text-muted-foreground">共 {students.length} 名</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>学生</TableHead>
              <TableHead>班级</TableHead>
              <TableHead className="w-40">出勤率</TableHead>
              <TableHead className="text-right">平均分</TableHead>
              <TableHead className="text-right">评估</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.no}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-brand-accent text-xs font-medium text-primary-foreground">
                        {initials(s.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.no}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{s.cls}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={s.attendance} className="w-20" />
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {s.attendance}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground tabular-nums">
                  {s.avg}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-flex h-5 items-center rounded-full px-2 text-xs font-medium ${trendStyle[s.trend]}`}
                  >
                    {s.trend}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
