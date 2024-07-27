import { useEffect } from 'react'
import { Route, Router, Switch } from 'wouter'
import { Redirect } from 'wouter'
import { Calendar, Login, Privacy, Settings } from './pages'
import { calculateFillPercentage, setFavicon } from './utils'
import { AuthRoute, NoAuthRoute } from './utils/AuthRoutes'
import './App.css'
import dayjs from 'dayjs'
import { useGetMonth } from './hooks'

const App = () => {
  const month = useGetMonth(dayjs())

  useEffect(() => {
    month.data
      ? setFavicon(
          calculateFillPercentage(month.data.days.filter((day) => day.date === dayjs().format('YYYY-MM-DD'))[0].tasks),
        )
      : setFavicon(0.5)
  }, [month])

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
