import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/rootRoute'
import { protect, withNav } from '@/shared/auth/guard'
import { StudentLayout } from './layout/StudentLayout'
import { StudentHome } from './pages/StudentHome'
import { StudentCourses } from './pages/StudentCourses'

// 角色布局路由：在此守卫整片子路由（protect），并指定本角色专属布局
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
  ...withNav(['student'], { title: '首页', icon: '🏠', order: 1 }),
})

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/courses',
  component: StudentCourses,
  ...withNav(['student'], { title: '我的课程', icon: '📚', order: 2 }),
})

/** 导出整棵学生路由子树，供 app/router.tsx 聚合 */
export const studentRouteTree = layoutRoute.addChildren([homeRoute, coursesRoute])
