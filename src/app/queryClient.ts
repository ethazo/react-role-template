import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ApiError } from '@/shared/api/types'

/**
 * 全局请求错误反馈：统一在 Query/Mutation 缓存层弹 toast，
 * 而非污染 axios 请求层（请求层只负责把错误规整成 ApiError）。
 *
 * 两类错误不弹，避免重复/无意义反馈：
 * - 401：已由 axios 拦截器统一跳登录，再弹 toast 是双重反馈。
 * - meta.skipGlobalError：调用方自行处理错误（如登录表单内联提示、登录态探测）。
 */
function notifyError(error: unknown, meta?: { skipGlobalError?: boolean }) {
  if (meta?.skipGlobalError) return
  if (error instanceof ApiError && error.status === 401) return
  const message = error instanceof ApiError ? error.message : '操作失败，请稍后重试'
  toast.error(message)
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => notifyError(error, query.meta),
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => notifyError(error, mutation.meta),
  }),
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// 让 query/mutation 的 meta 获得 skipGlobalError 的类型推导
declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: { skipGlobalError?: boolean }
    mutationMeta: { skipGlobalError?: boolean }
  }
}
