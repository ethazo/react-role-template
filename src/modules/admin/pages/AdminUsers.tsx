import { MoreHorizontalIcon, PlusIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Row = {
  name: string
  email: string
  role: '学生' | '教师' | '管理员'
  dept: string
  status: '正常' | '已停用'
  lastActive: string
}

/** 示例数据：接入业务后由接口替换（路由已就绪 page/pageSize/keyword search 参数）。 */
const rows: Row[] = [
  {
    name: '林思源',
    email: 'linsy@med.edu',
    role: '学生',
    dept: '临床医学院',
    status: '正常',
    lastActive: '5 分钟前',
  },
  {
    name: '李慧敏',
    email: 'lihm@med.edu',
    role: '教师',
    dept: '基础医学院',
    status: '正常',
    lastActive: '1 小时前',
  },
  {
    name: '陈国华',
    email: 'cgh@med.edu',
    role: '教师',
    dept: '第一临床医学院',
    status: '正常',
    lastActive: '今天 09:12',
  },
  {
    name: '王梓萱',
    email: 'wzx@med.edu',
    role: '学生',
    dept: '护理学院',
    status: '正常',
    lastActive: '昨天',
  },
  {
    name: '赵明轩',
    email: 'zmx@med.edu',
    role: '管理员',
    dept: '医学信息中心',
    status: '正常',
    lastActive: '3 小时前',
  },
  {
    name: '张铭轩',
    email: 'zhmx@med.edu',
    role: '学生',
    dept: '口腔医学院',
    status: '已停用',
    lastActive: '7 天前',
  },
]

const roleStyle: Record<Row['role'], string> = {
  学生: 'bg-primary/10 text-primary',
  教师: 'bg-success/10 text-success',
  管理员: 'bg-brand-accent/14 text-brand-accent',
}

export function AdminUsers() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="用户管理"
        description="管理平台全部账号、角色与状态。"
        actions={
          <Button size="sm">
            <PlusIcon /> 新增用户
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 shadow-foreground/[0.04] ring-border/70">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative w-full max-w-xs">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="搜索姓名或邮箱" className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontalIcon /> 筛选
          </Button>
          <span className="ml-auto text-sm text-muted-foreground">共 248 个账号</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-y bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-4 text-xs font-medium text-muted-foreground">用户</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">角色</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">所属单位</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">状态</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">最近活跃</TableHead>
              <TableHead className="w-12 pr-4 text-right text-xs font-medium text-muted-foreground">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.email} className="border-border">
                <TableCell className="py-3 pl-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-brand-accent text-xs font-medium text-primary-foreground">
                        {r.name.slice(-2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'inline-flex h-5 items-center rounded-full px-2 text-xs font-medium',
                      roleStyle[r.role],
                    )}
                  >
                    {r.role}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.dept}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'inline-flex h-5 items-center gap-1.5 rounded-full px-2 text-xs font-medium',
                      r.status === '正常'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'size-1.5 rounded-full',
                        r.status === '正常' ? 'bg-success' : 'bg-muted-foreground',
                      )}
                    />
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.lastActive}</TableCell>
                <TableCell className="pr-4 text-right">
                  <Button variant="ghost" size="icon-sm" aria-label="更多操作">
                    <MoreHorizontalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <span>显示 1–6 条，共 248 条</span>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <Badge variant="secondary">1</Badge>
            <Button variant="outline" size="sm">
              下一页
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
