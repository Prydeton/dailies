import { useEffect } from 'react'
import { Route, Switch } from 'wouter'
import { Redirect } from 'wouter'

import { useCalendarStore } from './hooks'
import { useAuthSetup } from './hooks/useAuth'
import { Calendar, Login, Privacy, Settings } from './pages'
import { setFavicon } from './utils'
import './App.css'

const App = () => {
  useAuthSetup()
  const { calendar } = useCalendarStore()

  useEffect(() => {
    setFavicon(calendar)
  }, [calendar])
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/privacy" component={Privacy} />
        <Route path="" component={Calendar} />
        <Redirect to="" />
      </Switch>
    </>
  )
}

export default App
