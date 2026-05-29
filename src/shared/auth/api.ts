import { apiClient } from '@/shared/api/client'
import { ApiError } from '@/shared/api/types'
import type { CurrentUser } from '@/shared/types'
import { ALL_ROLES, type Role } from '@/config/roles'

export interface LoginPayload {
  username: string
  password: string
}

/**
 * 登录态由后端 cookie（USESSIONID）维持。但「当前用户」接口按角色分路径
 * （/ulps/{role}/self），刷新后前端需要知道该调哪个角色的 self——
 * 故把登录得到的角色缓存到 localStorage 作为提示（非鉴权凭据）。
 */
const ROLE_HINT_KEY = 'ulps.role'

function saveRoleHint(role: Role) {
  try {
    localStorage.setItem(ROLE_HINT_KEY, role)
  } catch {
    // localStorage 不可用时忽略；fetchMe 会回退为依次探测
  }
}

function readRoleHint(): Role | null {
  try {
    return normalizeRole(localStorage.getItem(ROLE_HINT_KEY) ?? '') ?? null
  } catch {
    return null
  }
}

function clearRoleHint() {
  try {
    localStorage.removeItem(ROLE_HINT_KEY)
  } catch {
    // 忽略
  }
}

/** 后端角色串（大写，如 TEACHER）→ 本地 Role（小写）。未知角色返回 undefined */
function normalizeRole(raw: string): Role | undefined {
  const lower = raw.trim().toLowerCase()
  return ALL_ROLES.find((role) => role === lower)
}

/** 后端 self 接口返回的用户档案（按需扩展字段） */
interface SelfProfile {
  id: number | string
  username: string
  name: string | null
  number?: string | null
  email?: string | null
  gender?: string | null
  school?: string | null
  status?: number
}

/** 拉取某角色的当前用户档案：GET /ulps/{role}/self */
function fetchSelf(role: Role): Promise<SelfProfile> {
  return apiClient.get(`/${role}/self`) as Promise<SelfProfile>
}

function toCurrentUser(profile: SelfProfile, role: Role): CurrentUser {
  return {
    id: String(profile.id),
    name: profile.name ?? profile.username,
    roles: [role],
    username: profile.username,
    number: profile.number,
    email: profile.email,
    gender: profile.gender,
    school: profile.school,
  }
}

/**
 * 登录：表单提交 username/password；后端成功后 set-cookie（USESSIONID）。
 * 登录响应 data 仅为角色串（如 "TEACHER"），需据此再拉取 /{role}/self 拿到用户详情。
 */
export async function login(payload: LoginPayload): Promise<CurrentUser> {
  const body = new URLSearchParams({
    username: payload.username,
    password: payload.password,
  })
  const rawRole = (await apiClient.post('/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })) as string

  const role = normalizeRole(rawRole)
  if (!role) {
    throw new ApiError(`暂不支持的角色：${rawRole}`)
  }
  saveRoleHint(role)
  const profile = await fetchSelf(role)
  return toCurrentUser(profile, role)
}

/** 退出登录：GET /ulps/logout，后端清除 cookie */
export async function logout(): Promise<void> {
  clearRoleHint()
  await apiClient.get('/logout')
}

/**
 * 拉取当前用户。登录态由后端 cookie 维持，但 self 接口按角色分路径，
 * 故依赖登录时缓存的角色提示精确命中 /{role}/self：
 * - 无提示：视为未登录（不发无谓请求）。
 * - self 返回鉴权错误（401/403）：cookie 已失效，清掉残留提示，
 *   避免登录页反复用旧提示去打 /self 触发重复 401。
 */
export async function fetchMe(): Promise<CurrentUser> {
  const role = readRoleHint()
  if (!role) {
    throw new ApiError('未登录', { status: 401 })
  }
  try {
    const profile = await fetchSelf(role)
    return toCurrentUser(profile, role)
  } catch (error) {
    const status = error instanceof ApiError ? error.status : undefined
    if (status === 401 || status === 403) {
      clearRoleHint()
    }
    throw error
  }
}
