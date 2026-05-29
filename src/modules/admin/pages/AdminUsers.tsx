import { ProfileCard } from '@/shared/components/ProfileCard'

/**
 * 用户管理页占位：业务接口/数据不在本模板范围内。
 * 这里仅展示当前登录用户基本信息，用于把「带守卫的子路由」流程走通。
 */
export function AdminUsers() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
      <ProfileCard />
      <p className="text-sm text-muted-foreground">列表/分页等业务接口接入后在此渲染。</p>
    </div>
  )
}
