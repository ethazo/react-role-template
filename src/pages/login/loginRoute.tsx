import { createRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { rootRoute } from '@/app/rootRoute'
import { useAuth } from '@/shared/auth/useAuth'
import { meQueryOptions } from '@/shared/auth/queries'
import { ApiError } from '@/shared/api/types'
import { getRoleHome } from '@/config/roles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { LoginBrandPanel } from './LoginBrandPanel'
import { APP_NAME, APP_LOGO_TEXT } from '@/config/app'

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
    <div className="grid min-h-full lg:grid-cols-2">
      {/* 左：品牌展示区（大屏可见） */}
      <LoginBrandPanel />

      {/* 右：登录表单 */}
      <div className="relative flex flex-col items-center justify-center bg-background px-5 py-12 sm:px-8">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        <div className="w-full max-w-sm">
          {/* 移动端精简品牌条（大屏由左侧展示区承担，故隐藏） */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-accent text-base font-bold text-primary-foreground">
              {APP_LOGO_TEXT}
            </span>
            <span className="font-heading text-lg font-semibold text-foreground">{APP_NAME}</span>
          </div>

          <div className="mb-7 space-y-1.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              欢迎回来
            </h1>
            <p className="text-sm text-muted-foreground">登录以继续使用{APP_NAME}</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input id="username" {...register('username')} placeholder="请输入用户名" />
              {errors.username && (
                <p className="text-xs text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">密码</Label>
                <button
                  type="button"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  忘记密码？
                </button>
              </div>
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
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {loginError instanceof ApiError ? loginError.message : '登录失败'}
              </p>
            )}

            <Button type="submit" disabled={isLoggingIn} size="lg" className="w-full">
              {isLoggingIn ? '登录中…' : '登录'}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            登录即代表同意平台服务条款与隐私政策
          </p>
        </div>
      </div>
    </div>
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
