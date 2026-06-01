/**
 * 品牌皮肤的运行时应用。
 *
 * 机制：在 <html> 上设置 data-brand="xxx"，对应 tokens/brands/xxx.css 里的
 * [data-brand='xxx'] 覆盖 --brand-* 色阶，semantic 令牌与全部组件随之级联。
 * 与 next-themes 的明暗（.dark 类）正交，互不干扰。
 */
import { ALL_BRANDS, DEFAULT_BRAND, type BrandName } from '@/config/theme'

const STORAGE_KEY = 'app.brand'

function readStoredBrand(): BrandName | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY) ?? ''
    // 动态对照 ALL_BRANDS，新增/改名皮肤无需再改这里
    return (ALL_BRANDS as readonly string[]).includes(v) ? (v as BrandName) : null
  } catch {
    return null
  }
}

/** 当前生效的品牌（用户选择优先于默认） */
export function getBrand(): BrandName {
  return readStoredBrand() ?? DEFAULT_BRAND
}

/** 应用品牌皮肤：设置 <html data-brand>。main.tsx 启动时调用一次。 */
export function applyBrand(brand: BrandName = getBrand()): void {
  document.documentElement.setAttribute('data-brand', brand)
}

/** 运行时切换品牌并持久化 */
export function setBrand(brand: BrandName): void {
  try {
    localStorage.setItem(STORAGE_KEY, brand)
  } catch {
    // 忽略
  }
  applyBrand(brand)
}
