import { useState } from 'react'
import { TypeIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ENABLE_THEME_SWITCH, type FontPreset } from '@/config/theme'
import { getFontPreset, setFontPreset } from '@/shared/theme/fonts'

const FONT_LABELS: Record<FontPreset, string> = {
  system: '系统字体',
  'noto-sans-sc': '思源黑体',
  'alibaba-puhuiti': '阿里巴巴普惠体',
}

/**
 * 字体切换按钮。切换到非系统字体时按需加载本地 woff2（同源、离线）。
 */
export function FontToggle() {
  const [font, setCurrent] = useState(getFontPreset)

  if (!ENABLE_THEME_SWITCH) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="切换字体">
          <TypeIcon className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(FONT_LABELS) as FontPreset[]).map((preset) => (
          <DropdownMenuItem
            key={preset}
            onClick={() => {
              setFontPreset(preset)
              setCurrent(preset)
            }}
          >
            <span className="flex-1">{FONT_LABELS[preset]}</span>
            {font === preset && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
