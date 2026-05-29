import { useAuth } from '@/shared/auth/useAuth'
import { ROLES } from '@/config/roles'

/**
 * 展示当前登录用户的基本信息（来自 /{role}/self）。
 * 业务接口/数据不在模板范围内，这里仅用于把登录→鉴权→展示流程走通。
 */
export function ProfileCard() {
  const { user } = useAuth()
  if (!user) return null

  const rows: Array<[string, string | null | undefined]> = [
    ['姓名', user.name],
    ['登录名', user.username],
    ['编号', user.number],
    ['角色', user.roles.map((r) => ROLES[r].label).join('、')],
    ['性别', user.gender],
    ['邮箱', user.email],
    ['学校', user.school],
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">我的信息</h2>
      <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 text-sm">
            <dt className="w-16 shrink-0 text-muted-foreground">{label}</dt>
            <dd className="text-foreground">{value || '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
