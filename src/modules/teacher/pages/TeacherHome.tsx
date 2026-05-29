import { ProfileCard } from '@/shared/components/ProfileCard'

export function TeacherHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">教师工作台</h1>
      <ProfileCard />
      <p className="text-sm text-muted-foreground">教师端示例页（共享侧边菜单布局）。</p>
    </div>
  )
}
