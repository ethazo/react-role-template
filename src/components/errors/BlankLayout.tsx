import type { ReactNode } from 'react'

/** 空白布局：登录页、错误页等不需要导航外壳的场景 */
export function BlankLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-muted/40 p-4">
      {children}
    </div>
  )
}
