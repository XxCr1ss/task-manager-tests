import React, { Suspense, lazy } from 'react'
import { Switch, Route, useLocation } from 'wouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import ErrorBoundary from './components/ErrorBoundary'

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Lazy load microfrontends
const LoginPage = lazy(() => import('authApp/LoginPage'))
const RegisterPage = lazy(() => import('authApp/RegisterPage'))
const DashboardPage = lazy(() => import('dashboardApp/DashboardPage'))
const NotFoundPage = lazy(() => import('notFoundApp/NotFoundPage'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
)

// Redirect component
const RedirectToDashboard = () => {
  const [, setLocation] = useLocation()
  
  React.useEffect(() => {
    setLocation('/dashboard')
  }, [])

  return <LoadingSpinner />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/" component={RedirectToDashboard} />
              <Route component={NotFoundPage} />
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </div>
    </QueryClientProvider>
  )
}

export default App