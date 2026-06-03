import type { Role } from '@/config/roles'

/** 当前登录用户（由 /{role}/self 接口返回，组装而成） */
export interface CurrentUser {
  id: string
  name: string
  /**
   * 用户角色集合，权限/访问控制均按「角色集合」判断。
   *
   * 注意：当前后端登录只返回单个角色，故运行时这里恒为长度 1 的数组
   * （见 lib/auth/api.ts 的 toCurrentUser）。之所以仍按数组建模，是为了让守卫
   * (protect)、hasAnyRole 等骨架天然支持「一人多角色」，将来后端改为返回多角色时
   * 无需改动这些核心逻辑。取「主角色」请用 roles[0]。
   */
  roles: Role[]
}
