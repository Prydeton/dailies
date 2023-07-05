import { Route } from 'wouter'
import './App.css'
import { Login } from './pages'

const App = () => {
  return (<>
    <Route path="/login" component={Login}></Route>
  </>)
}

export default App
