import { Outlet } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { TopNav } from '@/shared/components/TopNav'
import { Button } from '@/components/ui/button'

/**
 * 教师端布局：工作区式（非后台）。
 *
 * 与学生端共用顶栏结构，但取 underline 激活态（更紧凑专业），并在右侧常驻
 * 主操作按钮（新建课程）。内容区更宽、密度更高，偏「生产力工具」气质——
 * 契合教师备课、管理课程与学生的使用场景。
 */
export function TeacherLayout() {
  return (
    <div className="flex min-h-full flex-col bg-muted dark:bg-background">
      <TopNav
        tone="underline"
        rightExtra={
          <Button size="sm" className="hidden sm:inline-flex">
            <PlusIcon /> 新建课程
          </Button>
        }
      />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
