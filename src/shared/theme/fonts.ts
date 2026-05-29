/**
 * 字体预设的运行时应用。
 *
 * 设计要点（针对内网/信创部署）：
 * - 非系统字体一律「本地自托管 + 按需 import」：通过动态 import() 引入
 *   @fontsource 的本地 CSS，Vite 会把对应 woff2 打进 dist，同源加载、零外网依赖。
 * - system 预设不 import 任何字体文件 → 真正零加载、天然离线。
 * - 字体栈始终保留系统中文兜底（苹方/鸿蒙/雅黑/思源），生僻字不会出方块。
 */
import { DEFAULT_FONT, type FontPreset } from '@/config/theme'

const STORAGE_KEY = 'app.font'

/** 系统中文字体兜底栈：英文/数字优先 Geist，中文落到各平台系统黑体 */
const SYSTEM_STACK =
  "'Geist Variable', 'PingFang SC', 'HarmonyOS Sans SC', 'Microsoft YaHei', 'Source Han Sans SC', system-ui, -apple-system, 'Segoe UI', sans-serif"

interface FontPresetDef {
  /** 写入 --app-font-sans 的字体栈 */
  stack: string
  /** 需要加载的本地字体文件（动态 import 本地 css）；system 为 null */
  load: (() => Promise<unknown>) | null
}

const FONT_PRESETS: Record<FontPreset, FontPresetDef> = {
  system: {
    stack: SYSTEM_STACK,
    load: null,
  },
  'noto-sans-sc': {
    // 思源黑体置于 Geist 之后、系统栈之前：中文用思源，英文数字仍用 Geist
    stack: `'Geist Variable', 'Noto Sans SC', ${SYSTEM_STACK.replace("'Geist Variable', ", '')}`,
    load: loadNotoSansSc,
  },
  'alibaba-puhuiti': {
    stack: `'Geist Variable', 'Alibaba PuHuiTi', ${SYSTEM_STACK.replace("'Geist Variable', ", '')}`,
    load: loadAlibabaPuhuiti,
  },
}

/**
 * 加载思源黑体「简体中文常用字」子集（字重 400/500/700，各约 1.1MB）。
 *
 * 刻意不 import fontsource 自带的 .css（它同时引用 .woff + .woff2，会把没人用的
 * .woff 也打进 dist）。改为用 `?url` 只引 woff2，再经 FontFace API 注册——
 * 产物里只保留 woff2，体积减半。font-display: swap 由 FontFace 的 display 指定。
 */
async function loadNotoSansSc(): Promise<void> {
  // 静态字面量路径，Vite 才能静态分析并把 woff2 作为独立资源打包
  const [w400, w500, w700] = await Promise.all([
    import('@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff2?url'),
    import('@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-500-normal.woff2?url'),
    import('@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-700-normal.woff2?url'),
  ])
  const faces = [
    new FontFace('Noto Sans SC', `url(${w400.default}) format('woff2')`, {
      weight: '400',
      display: 'swap',
    }),
    new FontFace('Noto Sans SC', `url(${w500.default}) format('woff2')`, {
      weight: '500',
      display: 'swap',
    }),
    new FontFace('Noto Sans SC', `url(${w700.default}) format('woff2')`, {
      weight: '700',
      display: 'swap',
    }),
  ]
  faces.forEach((face) => {
    document.fonts.add(face)
    void face.load()
  })
}

/**
 * 加载阿里巴巴普惠体（需自行下载转换后投放，见 src/assets/fonts/alibaba-puhuiti/README）。
 *
 * 兼容两种投放方式，都只用 woff2、都同源离线：
 *  1) 整体子集单文件：直接把 *.woff2 放到该目录，文件名含字重数字（如 alibaba-400.woff2），
 *     这里用 FontFace 注册为 'Alibaba PuHuiTi'。
 *  2) cn-font-split 分包：把其输出（含 .css 与 woff2 分块）放到子目录，
 *     其 .css 自带 @font-face（family 须为 'Alibaba PuHuiTi'），这里直接加载该 .css。
 *
 * 目录为空时两个 glob 均为空 → 不报错、自动回落系统字体栈。
 */
async function loadAlibabaPuhuiti(): Promise<void> {
  // 方式一：整体子集 woff2（文件名含字重）
  const files = import.meta.glob('/src/assets/fonts/alibaba-puhuiti/*.woff2', {
    query: '?url',
    import: 'default',
  }) as Record<string, () => Promise<string>>
  await Promise.all(
    Object.entries(files).map(async ([path, resolve]) => {
      const url = await resolve()
      const weight = path.match(/[1-9]00/)?.[0] ?? '400'
      const face = new FontFace('Alibaba PuHuiTi', `url(${url}) format('woff2')`, {
        weight,
        display: 'swap',
      })
      document.fonts.add(face)
      void face.load()
    }),
  )

  // 方式二：cn-font-split 分包输出，其 .css 自带 @font-face，直接加载使其生效
  const sheets = import.meta.glob('/src/assets/fonts/alibaba-puhuiti/**/*.css')
  await Promise.all(Object.values(sheets).map((load) => load()))
}

function readStoredFont(): FontPreset | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v && v in FONT_PRESETS ? (v as FontPreset) : null
  } catch {
    return null
  }
}

/** 当前生效的字体预设（用户选择优先于默认） */
export function getFontPreset(): FontPreset {
  return readStoredFont() ?? DEFAULT_FONT
}

/**
 * 应用某字体预设：写入 CSS 变量并按需加载本地字体文件。
 * 在 main.tsx 启动时调用一次；运行时切换也走它。
 */
export function applyFontPreset(preset: FontPreset = getFontPreset()): void {
  const def = FONT_PRESETS[preset]
  document.documentElement.style.setProperty('--app-font-sans', def.stack)
  // 字体文件异步加载，不阻塞首屏（font-display: swap 先用系统字体兜底）
  void def.load?.()
}

/** 运行时切换字体并持久化 */
export function setFontPreset(preset: FontPreset): void {
  try {
    localStorage.setItem(STORAGE_KEY, preset)
  } catch {
    // 忽略：localStorage 不可用时仅本次会话生效
  }
  applyFontPreset(preset)
}
