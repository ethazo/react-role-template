import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/lib/root-route'
import { protect } from '@/lib/auth'
import { TeacherLayout } from './layout/TeacherLayout'
import { TeacherHome } from './pages/TeacherHome'
import { TeacherCourses } from './pages/TeacherCourses'
import { TeacherStudents } from './pages/TeacherStudents'

// 角色布局路由：守卫整片子路由（protect），并指定教师端布局。
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher',
  component: TeacherLayout,
  ...protect(['teacher']),
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: TeacherHome,
})

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/courses',
  component: TeacherCourses,
})

const studentsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/students',
  component: TeacherStudents,
})

/** 导出整棵教师路由子树，供 app/router.tsx 聚合 */
export const teacherRouteTree = layoutRoute.addChildren([homeRoute, coursesRoute, studentsRoute])
