import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Microfrontend error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error al cargar el módulo</h2>
            <p className="text-gray-600 mb-4">Algo salió mal cargando este microfrontend.</p>
            <details className="text-sm text-gray-500">
              <summary className="cursor-pointer font-medium">Detalles del error</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {this.state.error && this.state.error.toString()}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Recargar página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary