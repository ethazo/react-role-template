import type { Role } from '@/config/roles'

/** 当前登录用户（由 /{role}/self 接口返回，组装而成） */
export interface CurrentUser {
  id: string
  name: string
  /** 一个用户可拥有多个角色；权限/导航按角色集合判断 */
  roles: Role[]
  /** 登录名 */
  username?: string
  /** 学号/工号等编号 */
  number?: string | null
  email?: string | null
  gender?: string | null
  school?: string | null
}

/** 导航元信息：决定一个页面是否出现在导航里、怎么展示 */
export interface NavMeta {
  title: string
  /** 图标名/emoji，交由具体布局解释 */
  icon?: string
  /** 排序，小的在前 */
  order?: number
}

/**
 * 挂在每个路由 staticData 上的元信息。
 * - roles：哪些角色可见（用于导航过滤；访问控制由 guard 单独保证）
 * - nav：有此字段才会进入导航数据
 */
export interface RouteMeta {
  roles?: Role[]
  nav?: NavMeta
}

// 让 route.staticData 获得 RouteMeta 的类型推导
declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    roles?: Role[]
    nav?: NavMeta
  }
}
