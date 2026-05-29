/**
 * 后端统一响应格式（约定，按真实后端可在此处集中调整）。
 * 约定：code === '00000' 表示成功，其余为业务错误；错误描述在 msg。
 */
export interface ApiEnvelope<T = unknown> {
  code: string
  msg: string
  data: T
}

/** 业务成功码 */
export const SUCCESS_CODE = '00000'

/** 标记业务/网络错误，便于上层统一捕获展示 */
export class ApiError extends Error {
  /** HTTP 状态码（网络层错误时存在） */
  status?: number
  /** 业务错误码（envelope.code） */
  code?: string

  constructor(message: string, options?: { status?: number; code?: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = options?.status
    this.code = options?.code
  }
}
