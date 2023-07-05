import { Route } from 'wouter'

import { useAuthSetup } from './hooks/useAuth'
import { Login, Main } from './pages'
import './App.css'

const App = () => {
  useAuthSetup()

  return (<>
    <Route path="/login" component={Login} />
    <Route path="/" component={Main} />
  </>)
}

export default App
