export function StudentCourses() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">我的课程</h1>
      <div className="space-y-3">
        {['系统解剖学', '生物化学', '医学免疫学'].map((name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <span className="font-medium text-card-foreground">{name}</span>
            <span className="text-sm text-indigo-600 dark:text-indigo-400">进行中</span>
          </div>
        ))}
      </div>
    </div>
  )
}
