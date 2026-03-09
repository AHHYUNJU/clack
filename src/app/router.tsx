import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProtectedRoute from '@/app/ProtectedRoute'
import ChannelPage from '@/pages/ChannelPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ChannelPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
