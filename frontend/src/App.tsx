import { Route } from 'wouter'
import './App.css'
import { Login, Main } from './pages'

const App = () => {
  return (<>
    <Route path="/login" component={Login} />
    <Route path="/" component={Main} />
  </>)
}

export default App
