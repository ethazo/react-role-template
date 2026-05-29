import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { rootRoute } from '@/app/rootRoute'
import { protect, withNav } from '@/shared/auth/guard'
import { SidebarLayout } from '@/layouts/SidebarLayout'
import { AdminHome } from './pages/AdminHome'
import { AdminUsers } from './pages/AdminUsers'

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => <SidebarLayout title="管理后台" />,
  ...protect(['admin']),
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: AdminHome,
  ...withNav(['admin'], { title: '概览', icon: '📊', order: 1 }),
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
  ...withNav(['admin'], { title: '用户管理', icon: '👥', order: 2 }),
})

export const adminRouteTree = layoutRoute.addChildren([homeRoute, usersRoute])
