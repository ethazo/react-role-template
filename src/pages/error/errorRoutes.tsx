import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/rootRoute'
import { BlankLayout } from '@/layouts/BlankLayout'
import { ForbiddenPage } from './ForbiddenPage'

export const forbiddenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/403',
  component: () => (
    <BlankLayout>
      <ForbiddenPage />
    </BlankLayout>
  ),
})
