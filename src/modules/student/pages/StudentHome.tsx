import { ProfileCard } from '@/shared/components/ProfileCard'

export function StudentHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">同学，你好 👋</h1>
      <ProfileCard />
      <p className="text-sm text-muted-foreground">学生端示例页（自定义布局，非侧边菜单形态）。</p>
    </div>
  )
}
