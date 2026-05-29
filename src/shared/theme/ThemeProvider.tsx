import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

/**
 * 暗黑模式 Provider（基于 next-themes，纯 React/Vite 下可用）。
 * - attribute="class"：在 <html> 上切换 .dark 类，配合 index.css 里
 *   `@custom-variant dark (&:is(.dark *))` 生效。
 * - defaultTheme="system" + enableSystem：默认跟随系统。
 * - disableTransitionOnChange：切换主题时禁用过渡，避免颜色闪烁。
 * 切换主题请用 next-themes 的 useTheme()，参考 ModeToggle 组件。
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
