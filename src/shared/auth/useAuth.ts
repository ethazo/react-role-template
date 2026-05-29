import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { login as loginApi, logout as logoutApi, type LoginPayload } from './api'
import { authKeys, meQueryOptions } from './queries'
import { getRoleHome, type Role } from '@/config/roles'

/**
 * 鉴权总入口 hook。
 * - user / isLoading：当前登录态（来自 /me 查询缓存）
 * - login：登录并把用户写入缓存，再按角色跳转
 * - logout：退出并清空缓存，跳回登录
 */
export function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery({
    ...meQueryOptions,
    // 鉴权失败视为未登录，不把错误抛给页面
    throwOnError: false,
  })

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (loggedInUser) => {
      queryClient.setQueryData(meQueryOptions.queryKey, loggedInUser)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: authKeys.me })
      void navigate({ to: '/login' })
    },
  })

  return {
    user,
    isLoading,
    /** 是否已登录（已拿到用户信息） */
    isLoggedIn: !!user,
    /**
     * 当前用户是否拥有指定角色。
     * 角色判断的统一入口——业务代码不要直接写 user.roles.includes(...)，
     * 以后升级到「权限码」体系时只改这里。
     */
    hasRole: (role: Role) => !!user?.roles.includes(role),
    /** 当前用户是否拥有给定角色中的任意一个 */
    hasAnyRole: (roles: Role[]) => roles.some((role) => !!user?.roles.includes(role)),
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    /** 登录成功后返回该用户的默认首页路径，供页面决定跳转目标 */
    login: async (payload: LoginPayload) => {
      const loggedInUser = await loginMutation.mutateAsync(payload)
      return getRoleHome(loggedInUser.roles[0])
    },
    logout: () => logoutMutation.mutate(),
  }
}
