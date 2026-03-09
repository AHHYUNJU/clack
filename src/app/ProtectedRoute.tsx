import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store'

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) return null

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
