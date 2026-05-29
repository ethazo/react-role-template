import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/rootRoute'
import { protect, withNav } from '@/shared/auth/guard'
import { SidebarLayout } from '@/layouts/SidebarLayout'
import { TeacherHome } from './pages/TeacherHome'
import { TeacherCourses } from './pages/TeacherCourses'

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher',
  component: () => <SidebarLayout title="教师工作台" />,
  ...protect(['teacher']),
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: TeacherHome,
  ...withNav(['teacher'], { title: '工作台', icon: '🏠', order: 1 }),
})

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/courses',
  component: TeacherCourses,
  ...withNav(['teacher'], { title: '我的课程', icon: '📚', order: 2 }),
})

export const teacherRouteTree = layoutRoute.addChildren([homeRoute, coursesRoute])
