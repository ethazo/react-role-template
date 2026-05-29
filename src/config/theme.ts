/**
 * 主题单一数据源 (Single source of truth for theming).
 *
 * 和 config/roles.ts 同一套哲学：把「会随项目变」的东西收敛到一处配置。
 * 换品牌/换字体只改这里，骨架与组件代码不动。
 *
 * - 颜色分层令牌见 src/shared/theme/tokens/*（primitives → brands → semantic）
 * - 运行时应用逻辑见 src/shared/theme/{brand,fonts}.ts
 */

/** 可选品牌皮肤；新增皮肤：加一行 + 在 tokens/brands/ 下加同名 css */
export const BRANDS = {
  medical: { label: '医疗' },
  education: { label: '教育' },
} as const

export type BrandName = keyof typeof BRANDS

export const ALL_BRANDS = Object.keys(BRANDS) as BrandName[]

/** 开箱默认皮肤（也可被 localStorage 中用户的选择覆盖，见 brand.ts） */
export const DEFAULT_BRAND: BrandName = 'medical'

/**
 * 字体预设。
 * - system：系统字体栈，零加载、离线天然可用（默认）
 * - noto-sans-sc：思源黑体，本地自托管按需加载（已随 @fontsource/noto-sans-sc 安装）
 * - alibaba-puhuiti：阿里巴巴普惠体，需自行下载转换后投放到
 *   src/assets/fonts/alibaba-puhuiti/（详见该目录 README）；未投放时自动回落系统字体。
 * 新增字体：加一行 + 在 fonts.ts 的 FONT_PRESETS 里登记字体栈与加载器。
 */
export type FontPreset = 'system' | 'noto-sans-sc' | 'alibaba-puhuiti'

/** 默认字体预设。内网/信创环境保持 system 即可零依赖离线运行。 */
export const DEFAULT_FONT: FontPreset = 'system'

/** 是否允许用户在界面上运行时切换品牌/字体（关掉则锁定为默认值） */
export const ENABLE_THEME_SWITCH = true
