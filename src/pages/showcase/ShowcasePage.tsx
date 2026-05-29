import { Link } from '@tanstack/react-router'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { BrandToggle } from '@/shared/components/BrandToggle'
import { FontToggle } from '@/shared/components/FontToggle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

/** 区块标题 */
function Section({
  title,
  desc,
  children,
}: {
  title: string
  desc?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
      </div>
      {children}
    </section>
  )
}

/** 单个色卡 */
function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-1.5">
      <div className={`h-14 w-full rounded-lg border border-border ${className}`} />
      <div className="text-xs text-muted-foreground">{name}</div>
    </div>
  )
}

const PATIENTS = [
  { id: 'P-2041', name: '张伟', dept: '心内科', status: 'normal' },
  { id: 'P-2042', name: '李娜', dept: '呼吸科', status: 'warning' },
  { id: 'P-2043', name: '王芳', dept: '急诊科', status: 'critical' },
  { id: 'P-2044', name: '刘洋', dept: '内分泌科', status: 'normal' },
] as const

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  normal: { label: '正常', className: 'bg-success/10 text-success' },
  warning: { label: '异常', className: 'bg-warning/15 text-warning' },
  critical: { label: '危急值', className: 'bg-destructive/10 text-destructive' },
}

/**
 * 设计系统活文档 / 组件展示页（公共路由 /showcase）。
 * 右上角可切换「品牌皮肤 / 字体 / 明暗」，实时观察整套令牌的级联效果。
 * 不接业务，仅用于验收主题底座与设计规范。
 */
export function ShowcasePage() {
  return (
    <div className="min-h-full bg-muted/30">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur">
        <div>
          <h1 className="text-xl font-bold text-foreground">设计系统 · 组件展示</h1>
          <p className="text-sm text-muted-foreground">
            医疗 / 教育主题底座 —— 切换皮肤、字体、明暗实时预览
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BrandToggle />
          <FontToggle />
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">返回登录</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-12 px-8 py-10">
        <Section title="品牌与语义色" desc="换皮肤时主色/强调随之变化，状态色保持稳定语义">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <Swatch name="primary" className="bg-primary" />
            <Swatch name="accent" className="bg-accent" />
            <Swatch name="brand-accent" className="bg-brand-accent" />
            <Swatch name="secondary" className="bg-secondary" />
            <Swatch name="muted" className="bg-muted" />
            <Swatch name="border" className="bg-border" />
            <Swatch name="success 正常" className="bg-success" />
            <Swatch name="warning 警告" className="bg-warning" />
            <Swatch name="info 提示" className="bg-info" />
            <Swatch name="destructive 危急" className="bg-destructive" />
            <Swatch name="foreground" className="bg-foreground" />
            <Swatch name="card" className="bg-card" />
          </div>
        </Section>

        <Section title="图表色板" desc="5 色分类调色板，跨皮肤保证仪表盘可辨识">
          <div className="grid grid-cols-5 gap-4">
            <Swatch name="chart-1" className="bg-chart-1" />
            <Swatch name="chart-2" className="bg-chart-2" />
            <Swatch name="chart-3" className="bg-chart-3" />
            <Swatch name="chart-4" className="bg-chart-4" />
            <Swatch name="chart-5" className="bg-chart-5" />
          </div>
        </Section>

        <Section title="按钮">
          <div className="flex flex-wrap items-center gap-3">
            <Button>主要按钮</Button>
            <Button variant="secondary">次要</Button>
            <Button variant="outline">描边</Button>
            <Button variant="ghost">幽灵</Button>
            <Button variant="destructive">危险操作</Button>
            <Button variant="link">链接</Button>
            <Button disabled>禁用</Button>
          </div>
        </Section>

        <Section title="徽章 / 状态标签" desc="医疗场景常用：正常 / 异常 / 危急值">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>默认</Badge>
            <Badge variant="secondary">次要</Badge>
            <Badge variant="outline">描边</Badge>
            <Badge className="bg-success/10 text-success">正常</Badge>
            <Badge className="bg-warning/15 text-warning">待处理</Badge>
            <Badge className="bg-info/10 text-info">提示</Badge>
            <Badge variant="destructive">危急值</Badge>
          </div>
        </Section>

        <Section title="表单">
          <div className="grid max-w-md gap-4">
            <div className="space-y-2">
              <Label htmlFor="demo-name">姓名</Label>
              <Input id="demo-name" placeholder="请输入姓名" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-id">就诊卡号 / 学号</Label>
              <Input id="demo-id" placeholder="例如 P-2041" />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="demo-switch" defaultChecked />
              <Label htmlFor="demo-switch">接收异常提醒</Label>
            </div>
            <Button className="w-fit">提交</Button>
          </div>
        </Section>

        <Section title="数据表格" desc="紧凑密度 + 数字等宽，适合医疗/教育数据列表">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>编号</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>科室</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PATIENTS.map((p) => {
                    const s = STATUS_BADGE[p.status]
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono tabular-nums text-muted-foreground">
                          {p.id}
                        </TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.dept}</TableCell>
                        <TableCell>
                          <Badge className={s.className}>{s.label}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>

        <Section title="卡片">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">今日门诊</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold tabular-nums text-primary">
                1,204
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">待审核</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold tabular-nums text-warning">18</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">在线设备</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold tabular-nums text-success">96</CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  )
}
