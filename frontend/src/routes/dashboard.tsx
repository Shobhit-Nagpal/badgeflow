import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    const token = await context.auth?.getToken()
    if (!token) {
      redirect({
        to: '/',
        throw: true,
      })
    }
  },
  component: () => {
    return <Outlet />
  },
})
