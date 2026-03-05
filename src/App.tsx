import { BrowserRouter } from 'react-router-dom'
import Router from '@/app/router'
import Providers from '@/app/providers'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Providers>
  )
}

export default App
