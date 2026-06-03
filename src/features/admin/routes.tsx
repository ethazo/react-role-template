import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { rootRoute } from '@/lib/root-route'
import { protect } from '@/lib/auth'
import { AdminLayout } from './layout/AdminLayout'
import { AdminHome } from './pages/AdminHome'
import { AdminUsers } from './pages/AdminUsers'
import { AdminSettings } from './pages/AdminSettings'

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
  ...protect(['admin']),
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: AdminHome,
})

// 列表页 search 参数：URL 即状态。coerce 把 URL 字符串转成数字，catch 提供默认值
const usersSearchSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10),
  keyword: z.string().optional().catch(undefined),
})

const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/users',
  component: AdminUsers,
  validateSearch: usersSearchSchema,
})

const settingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/settings',
  component: AdminSettings,
})

export const adminRouteTree = layoutRoute.addChildren([homeRoute, usersRoute, settingsRoute])
