import { Route } from 'wouter'

import { useAuthSetup } from './hooks/useAuth'
import { Calendar, Login } from './pages'
import './App.css'

const App = () => {
  useAuthSetup()

  return (<>
    <Route path="/login" component={Login} />
    <Route path="/" component={Calendar} />
  </>)
}

export default App
