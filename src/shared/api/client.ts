import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
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
 *
 * 注意：apiClient 为内部细节，业务代码一律走下方导出的 `http`，
 * 以统一请求范式（类型化返回、配置项收口）。
 */
const apiClient = axios.create({
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
    // 探测请求（silent）的 401 属预期内，交还给调用方处理，不触发全局跳登录
    if (status === 401 && !error.config?.silent) {
      handleUnauthorized()
    }
    const message = error.response?.data?.msg ?? error.message ?? '网络异常，请稍后重试'
    return Promise.reject(new ApiError(message, { status, code: error.response?.data?.code }))
  },
)

/**
 * 请求配置：仅暴露业务常用项（查询参数、请求头、取消信号、silent 探测标记），
 * 其余 axios 配置刻意不开放，避免调用方绕过统一范式。
 */
type RequestConfig = Pick<AxiosRequestConfig, 'params' | 'headers' | 'signal' | 'silent'>

/**
 * 类型化的请求入口（业务唯一出口）。
 * 经响应拦截器解包后，调用方直接拿到 envelope.data 的类型 T。
 */
export const http = {
  get: <T>(url: string, config?: RequestConfig) => apiClient.get(url, config) as Promise<T>,
  post: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    apiClient.post(url, body, config) as Promise<T>,
}
