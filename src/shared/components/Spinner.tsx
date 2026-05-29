/** 通用加载指示（无业务、无组件库依赖） */
export function Spinner({ label = '加载中…' }: { label?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-muted-foreground">
      <span className="mr-3 inline-block h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
      {label}
    </div>
  )
}
