import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/rootRoute'
import { ShowcasePage } from './ShowcasePage'

/**
 * 设计系统展示页（公共、无需登录），便于直接预览主题底座。
 * 生产环境如需隐藏，可在 router 聚合处去掉本路由。
 */
export const showcaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/showcase',
  component: ShowcasePage,
})
