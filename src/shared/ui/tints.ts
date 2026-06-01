/**
 * 品类渐变色板（活力年轻教育风的「彩色」来源）。
 *
 * 身份双色（科技蓝 + 医疗青绿）走 from-primary to-brand-accent；而课程 / 竞赛 / 头像等
 * 需要「按品类区分」的彩色色块，则从这组精选高饱和渐变里取——集中定义一次，全站复用，
 * 既保证活泼多彩，又不污染语义令牌（primary/success/warning 仍只表达「状态/品牌」）。
 *
 * 每个 tint 提供两种用法：
 * - grad：实心渐变块（图标圆角块、课程封面），配白字；
 * - soft：极淡底 + 同色文字（标签、软高亮）。
 */
export type Tint = {
  /** 实心渐变（bg-gradient-to-br ...），用于色块/封面，搭配白色前景 */
  grad: string
  /** 柔和底 + 文字色，用于标签/软高亮 */
  soft: string
  /** 进度条 / 细条填充用的实色 */
  bar: string
}

export const TINTS: Tint[] = [
  {
    grad: 'bg-gradient-to-br from-sky-500 to-cyan-400',
    soft: 'bg-sky-500/12 text-sky-600 dark:text-sky-300',
    bar: 'bg-sky-500',
  },
  {
    grad: 'bg-gradient-to-br from-teal-500 to-emerald-400',
    soft: 'bg-teal-500/12 text-teal-600 dark:text-teal-300',
    bar: 'bg-teal-500',
  },
  {
    grad: 'bg-gradient-to-br from-violet-500 to-fuchsia-400',
    soft: 'bg-violet-500/12 text-violet-600 dark:text-violet-300',
    bar: 'bg-violet-500',
  },
  {
    grad: 'bg-gradient-to-br from-amber-500 to-orange-400',
    soft: 'bg-amber-500/14 text-amber-600 dark:text-amber-300',
    bar: 'bg-amber-500',
  },
  {
    grad: 'bg-gradient-to-br from-rose-500 to-pink-400',
    soft: 'bg-rose-500/12 text-rose-600 dark:text-rose-300',
    bar: 'bg-rose-500',
  },
  {
    grad: 'bg-gradient-to-br from-indigo-500 to-blue-400',
    soft: 'bg-indigo-500/12 text-indigo-600 dark:text-indigo-300',
    bar: 'bg-indigo-500',
  },
]

/** 按稳定下标取色（同一索引每次同色，适合按列表顺序着色）。 */
export function tintByIndex(i: number): Tint {
  return TINTS[((i % TINTS.length) + TINTS.length) % TINTS.length]
}
