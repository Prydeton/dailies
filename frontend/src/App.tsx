import { useEffect } from 'react'
import { Route, Router, Switch } from 'wouter'
import { Redirect } from 'wouter'

import { useAuth, useCalendarQuery } from './hooks'
import { Calendar, Login, Privacy, Settings } from './pages'
import { setFavicon } from './utils'
import { AuthRoute, NoAuthRoute } from './utils/AuthRoutes'
import './App.css'

const App = () => {
  const { calendar } = useCalendarQuery()
  const { session } = useAuth()

  useEffect(() => {
    session ? setFavicon(calendar) : setFavicon(undefined)
  }, [calendar, session])

  return (
    <Router>
      <Switch>
        <NoAuthRoute path="/login" component={Login} />
        <AuthRoute path="/settings" component={Settings} />
        <AuthRoute path="/" component={Calendar} />
        <Route path="/privacy" component={Privacy} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
