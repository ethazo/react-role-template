/**
 * 鉴权核心的公共出口（lib/auth 的 public API）。
 * 跨页面复用的鉴权能力都从这里取，内部文件（api/queries/useAuth/guard）不对外直引。
 */
export { useAuth } from './useAuth'
export { authKeys, meQueryOptions } from './queries'
export { protect, requireLogin } from './guard'
export type { LoginPayload } from './api'
