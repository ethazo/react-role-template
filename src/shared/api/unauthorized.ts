/**
 * 401 处理回调的注册点。
 *
 * 请求层（axios）不应直接依赖路由，否则就把「外观/导航」耦合进了「请求骨架」。
 * 这里提供一个可注册的回调：由 app 层在启动时把「跳登录」的逻辑塞进来，
 * 请求层只负责在 401 时调用它。
 */
type UnauthorizedHandler = () => void

let handler: UnauthorizedHandler | null = null

export function setUnauthorizedHandler(fn: UnauthorizedHandler): void {
  handler = fn
}

export function handleUnauthorized(): void {
  handler?.()
}
