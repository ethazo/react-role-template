import axios, { AxiosError } from 'axios'
import { ApiError, SUCCESS_CODE, type ApiEnvelope } from './types'
import { handleUnauthorized } from './unauthorized'
import { env } from '@/config/env'

/**
 * 统一请求实例。
 * - baseURL：来自环境变量 VITE_API_BASE_URL（如相对地址 '/ulps'）。
 *   本地开发由 Vite 代理转发、生产期由网关转发，便于随环境切换。
 * - withCredentials：自动携带 Cookie（USESSIONID，本模板的鉴权前提）
 * - 响应拦截：解包统一 envelope、把错误规整成 ApiError
 * - 401：调用已注册的处理器（默认跳登录），并向上抛出
 */
export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
})

apiClient.interceptors.response.use(
  (response) => {
    const envelope = response.data as ApiEnvelope
    // 兼容：若后端某些接口未走 envelope，直接返回原始 data
    if (envelope == null || typeof envelope !== 'object' || !('code' in envelope)) {
      return response.data
    }
    if (envelope.code !== SUCCESS_CODE) {
      throw new ApiError(envelope.msg || '请求失败', { code: envelope.code })
    }
    // 解包后，调用方拿到的就是 data 本身
    return envelope.data
  },
  (error: AxiosError<ApiEnvelope>) => {
    const status = error.response?.status
    if (status === 401) {
      handleUnauthorized()
    }
    const message = error.response?.data?.msg ?? error.message ?? '网络异常，请稍后重试'
    return Promise.reject(new ApiError(message, { status, code: error.response?.data?.code }))
  },
)

/** 简单类型化的 GET/POST 包装：调用方直接拿到解包后的 data 类型 */
export const http = {
  get: <T>(url: string, params?: unknown) => apiClient.get(url, { params }) as Promise<T>,
  post: <T>(url: string, body?: unknown) => apiClient.post(url, body) as Promise<T>,
}
