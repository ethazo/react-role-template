import { Button } from '@/components/ui/button'

export function TeacherCourses() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">我的课程</h1>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {['系统解剖学（2024 春）', '生物化学（2024 春）', '医学免疫学（2024 秋）'].map((name) => (
          <div
            key={name}
            className="flex items-center justify-between border-b border-border px-5 py-4 last:border-0"
          >
            <span className="text-card-foreground">{name}</span>
            <Button variant="link" size="sm" className="h-auto p-0">
              进入
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
