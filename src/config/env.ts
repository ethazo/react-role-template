import { z } from 'zod'

/**
 * 运行时环境变量校验。
 * 在应用入口最早被 import，一旦 .env 缺漏/非法即抛错并中止启动，
 * 把「配置错误」从难排查的运行时异常前移到启动期。
 *
 * 注意：只校验前端运行时真正读取的变量（VITE_ 前缀且经 import.meta.env 暴露）。
 * VITE_API_PROXY_TARGET 仅在 vite.config.ts（Node 侧）使用，不在此处。
 */
const envSchema = z.object({
  VITE_API_BASE_URL: z.string().min(1, 'VITE_API_BASE_URL 不能为空'),
  // 站点标题：注入 index.html 的 <title>，也可在运行时复用（如登录页/侧边栏品牌名）。
  // 缺省时回落，保证不因未配置而中断启动。
  VITE_APP_TITLE: z.string().min(1).default('react-role-template'),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error('❌ 环境变量校验失败：\n' + z.prettifyError(parsed.error))
  throw new Error('环境变量配置错误，请检查 .env 文件（参考 .env.example）')
}

/** 校验通过、类型安全的环境变量。请用它替代直接读取 import.meta.env */
export const env = parsed.data
