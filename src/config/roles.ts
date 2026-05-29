/**
 * 角色单一数据源 (Single source of truth for roles).
 *
 * 扩展角色只改这里：新增一行 + 新增对应 modules/<role>/ 即可。
 * 核心骨架（router 聚合、guard 守卫、useNavigation）都不认识具体角色名，
 * 只消费这里导出的数据与类型。
 */

export interface RoleConfig {
  /** 菜单/界面上展示的中文名 */
  label: string
  /** 该角色登录后默认跳转的首页路径 */
  home: string
}

export const ROLES = {
  student: { label: '学生', home: '/student' },
  teacher: { label: '教师', home: '/teacher' },
  admin: { label: '管理员', home: '/admin' },
} as const satisfies Record<string, RoleConfig>

/** 角色名联合类型，全程类型推导的根来源 */
export type Role = keyof typeof ROLES

export const ALL_ROLES = Object.keys(ROLES) as Role[]

/** 取某角色的默认首页；未知角色兜底到登录页 */
export function getRoleHome(role: Role | undefined): string {
  return role ? ROLES[role].home : '/login'
}
