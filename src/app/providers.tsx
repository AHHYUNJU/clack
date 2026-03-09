import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { useAuthStore } from '@/features/auth/store'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    initialize().then((fn) => { cleanup = fn })
    return () => cleanup?.()
  }, [initialize])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
