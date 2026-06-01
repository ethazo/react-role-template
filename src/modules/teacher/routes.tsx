import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/rootRoute'
import { protect, withNav } from '@/shared/auth/guard'
import { TeacherLayout } from './layout/TeacherLayout'
import { TeacherHome } from './pages/TeacherHome'
import { TeacherCourses } from './pages/TeacherCourses'
import { TeacherStudents } from './pages/TeacherStudents'

// 角色布局路由：守卫整片子路由（protect），并指定教师端「工作区式」布局。
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
  ...withNav(['teacher'], { title: '工作台', icon: 'dashboard', order: 1 }),
})

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/courses',
  component: TeacherCourses,
  ...withNav(['teacher'], { title: '我的课程', icon: 'courses', order: 2 }),
})

const studentsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/students',
  component: TeacherStudents,
  ...withNav(['teacher'], { title: '学生', icon: 'students', order: 3 }),
})

/** 导出整棵教师路由子树，供 app/router.tsx 聚合 */
export const teacherRouteTree = layoutRoute.addChildren([homeRoute, coursesRoute, studentsRoute])
