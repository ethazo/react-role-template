import { createRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { rootRoute } from '@/app/rootRoute'
import { BlankLayout } from '@/layouts/BlankLayout'
import { useAuth } from '@/shared/auth/useAuth'
import { ApiError } from '@/shared/api/types'
import { getRoleHome } from '@/config/roles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/shared/components/ModeToggle'
import { BrandToggle } from '@/shared/components/BrandToggle'
import { FontToggle } from '@/shared/components/FontToggle'

const loginSearchSchema = z.object({
  /** 登录后要回跳的地址（被守卫重定向到登录页时带上） */
  redirect: z.string().optional(),
})

const credentialsSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
})

type Credentials = z.infer<typeof credentialsSchema>

function LoginPage() {
  const { redirect } = loginRoute.useSearch()
  const router = useRouter()
  const { user, login, isLoggingIn, loginError } = useAuth()

  // 已登录（含登录成功后 user 写入缓存）统一在副作用里跳转，
  // 优先回跳 redirect 深链，否则去角色首页；避免在 render 阶段导航、避免与 onSubmit 抢路由
  useEffect(() => {
    if (user) {
      router.history.push(redirect ?? getRoleHome(user.roles[0]))
    }
  }, [user, redirect, router])

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
  component: LoginPage,
})
