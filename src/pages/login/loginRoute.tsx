import { createRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { rootRoute } from '@/app/rootRoute'
import { BlankLayout } from '@/layouts/BlankLayout'
import { useAuth } from '@/shared/auth/useAuth'
import { meQueryOptions } from '@/shared/auth/queries'
import { ApiError } from '@/shared/api/types'
import { getRoleHome } from '@/config/roles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { BrandToggle } from '@/shared/components/BrandToggle'
import { FontToggle } from '@/shared/components/FontToggle'

/**
 * 把外部传入的 redirect 收敛为「站内绝对路径」，否则丢弃。
 * 防开放重定向：排除协议相对地址（//evil.com）、含协议的跳转（http(s)://）、
 * 反斜杠绕过（\\evil.com，部分浏览器按 // 解析）等——只允许以单个 / 开头的站内路径。
 */
function sanitizeRedirect(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return undefined
  return raw
}

const loginSearchSchema = z.object({
  /** 登录后要回跳的地址（被守卫重定向到登录页时带上）；经 sanitize 仅保留站内路径 */
  redirect: z.string().optional().transform(sanitizeRedirect),
})

const credentialsSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
})

type Credentials = z.infer<typeof credentialsSchema>

function LoginPage() {
  const { redirect: redirectTo } = loginRoute.useSearch()
  const navigate = useNavigate()
  const { user, login, isLoggingIn, loginError } = useAuth()

  // 登录成功后 user 写入缓存 → 这里统一跳转：优先回跳 redirect 深链，否则去角色首页。
  // 用 navigate 而非 history.push，保留路由类型推导与 search 处理；放副作用里避免 render 阶段导航。
  useEffect(() => {
    if (user) {
      void navigate({ to: redirectTo ?? getRoleHome(user.roles[0]) })
    }
  }, [user, redirectTo, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({ resolver: zodResolver(credentialsSchema) })

  const onSubmit = handleSubmit(async (values) => {
    await login(values)
    // 跳转交给上面的 useEffect 统一处理（user 写入缓存后触发）
  })

  return (
    <BlankLayout>
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <BrandToggle />
        <FontToggle />
        <ModeToggle />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          {/* 品牌色块 logo 占位：换皮肤自动变色 */}
          <span className="mb-2 grid size-12 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
            U
          </span>
          <CardTitle className="text-xl">统一登录</CardTitle>
          <p className="text-sm text-muted-foreground">医疗 · 教育一体化平台</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input id="username" {...register('username')} placeholder="请输入用户名" />
              {errors.username && (
                <p className="text-xs text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="请输入密码"
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {loginError && (
              <p className="text-sm text-destructive">
                {loginError instanceof ApiError ? loginError.message : '登录失败'}
              </p>
            )}

            <Button type="submit" disabled={isLoggingIn} className="w-full">
              {isLoggingIn ? '登录中…' : '登录'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </BlankLayout>
  )
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: loginSearchSchema,
  // 已登录用户访问 /login：进入路由前直接重定向走，避免先闪一下登录表单。
  // search.redirect 已由 schema sanitize 过，可安全作为回跳目标。
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(meQueryOptions).catch(() => null)
    if (user) {
      throw redirect({ to: search.redirect ?? getRoleHome(user.roles[0]) })
    }
  },
  component: LoginPage,
})
