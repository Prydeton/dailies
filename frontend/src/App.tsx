import { Route } from 'wouter'
import './App.css'
import { Login, Main } from './pages'
import { useAuthSetup } from './hooks/useAuth'

const App = () => {
  useAuthSetup()
  
  return (<>
    <Route path="/login" component={Login} />
    <Route path="/" component={Main} />
  </>)
}

export default App
