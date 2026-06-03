import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/lib/root-route'
import { protect } from '@/lib/auth'
import { StudentLayout } from './layout/StudentLayout'
import { StudentHome } from './pages/StudentHome'
import { StudentCourses } from './pages/StudentCourses'
import { StudentContests } from './pages/StudentContests'

// 角色布局路由：在此守卫整片子路由（protect），并指定本角色布局。
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student',
  component: StudentLayout,
  ...protect(['student']),
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: StudentHome,
})

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/courses',
  component: StudentCourses,
})

const contestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/contests',
  component: StudentContests,
})

/** 导出整棵学生路由子树，供 app/router.tsx 聚合 */
export const studentRouteTree = layoutRoute.addChildren([homeRoute, coursesRoute, contestsRoute])
