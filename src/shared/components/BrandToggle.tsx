import { useState } from 'react'
import { PaletteIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ALL_BRANDS, BRANDS, ENABLE_THEME_SWITCH } from '@/config/theme'
import { getBrand, setBrand } from '@/shared/theme/brand'

/**
 * 品牌皮肤切换按钮。切换即整站换色（data-brand → 品牌色阶级联）。
 * ENABLE_THEME_SWITCH 关闭时不渲染（锁定为默认皮肤）。
 */
export function BrandToggle() {
  const [brand, setCurrent] = useState(getBrand)

  if (!ENABLE_THEME_SWITCH) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="切换主题皮肤">
          <PaletteIcon className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ALL_BRANDS.map((name) => (
          <DropdownMenuItem
            key={name}
            onClick={() => {
              setBrand(name)
              setCurrent(name)
            }}
          >
            <span className="flex-1">{BRANDS[name].label}</span>
            {brand === name && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
