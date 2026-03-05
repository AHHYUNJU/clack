import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ChannelPage from '@/pages/ChannelPage'

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<ChannelPage />} />
      </Route>
    </Routes>
  )
}
