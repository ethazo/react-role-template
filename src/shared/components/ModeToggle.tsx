import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * 主题切换按钮：点击在亮/暗之间直接切换，无下拉弹窗。
 *
 * 日 / 月图标由 `.dark` 类驱动交叉淡入（CSS 控制，始终与实际主题一致）；
 * 首次进入仍由 ThemeProvider 的 defaultTheme="system" 跟随系统，之后点击即覆盖。
 */
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="切换深色 / 浅色模式"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="size-[1.15rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-[1.15rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
