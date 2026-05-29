import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** 主题切换按钮：亮/暗/跟随系统。可直接放进 header/导航栏。 */
export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>亮色</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>暗色</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>跟随系统</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
