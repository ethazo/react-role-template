import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/rootRoute'
import { protect, withNav } from '@/shared/auth/guard'
import { StudentLayout } from './layout/StudentLayout'
import { StudentHome } from './pages/StudentHome'
import { StudentCourses } from './pages/StudentCourses'
import { StudentContests } from './pages/StudentContests'

// 角色布局路由：在此守卫整片子路由（protect），并指定本角色布局。
// 学生端是「门户式」体验（顶部水平导航，非后台侧边栏）——契合学习/参赛场景。
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
  ...withNav(['student'], { title: '首页', icon: 'home', order: 1 }),
})

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/courses',
  component: StudentCourses,
  ...withNav(['student'], { title: '我的课程', icon: 'courses', order: 2 }),
})

const contestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/contests',
  component: StudentContests,
  ...withNav(['student'], { title: '竞赛中心', icon: 'contests', order: 3 }),
})

/** 导出整棵学生路由子树，供 app/router.tsx 聚合 */
export const studentRouteTree = layoutRoute.addChildren([homeRoute, coursesRoute, contestsRoute])
