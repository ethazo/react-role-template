import { queryOptions } from '@tanstack/react-query'
import { fetchMe } from './api'

/** 查询键集中管理，便于失效/复用 */
export const authKeys = {
  me: ['auth', 'me'] as const,
}

/**
 * 当前用户的查询配置。
 * - guard 用 queryClient.ensureQueryData 在进路由前拿到它
 * - 组件用 useQuery 读取，二者共享同一份缓存
 */
export const meQueryOptions = queryOptions({
  queryKey: authKeys.me,
  queryFn: fetchMe,
  // 401 等鉴权错误不重试，避免无谓请求
  retry: false,
  staleTime: 5 * 60 * 1000,
  // 登录态探测：失败由「跳登录/渲染登录页」表达，不弹全局错误 toast
  meta: { skipGlobalError: true },
})
