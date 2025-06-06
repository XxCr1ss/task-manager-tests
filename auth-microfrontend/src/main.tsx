import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Switch } from 'wouter'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route>
        {() => {
          window.location.href = '/login'
          return null
        }}
      </Route>
    </Switch>
  </React.StrictMode>,
)