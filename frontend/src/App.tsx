import { Route, Switch } from 'wouter'
import { Redirect } from 'wouter'

import { useAuthSetup } from './hooks/useAuth'
import { Calendar, Login } from './pages'
import './App.css'

const App = () => {
  useAuthSetup()

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="" component={Calendar} />
        <Redirect to="" />
      </Switch>
    </>
  )
}

export default App
