/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** axios baseURL（默认相对地址 /ulps）；生产可设为相对前缀或完整后端 URL */
  readonly VITE_API_BASE_URL?: string
  /** 仅开发期：当 baseURL 为相对地址时，Vite 把该前缀代理到此后端地址 */
  readonly VITE_API_PROXY_TARGET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
