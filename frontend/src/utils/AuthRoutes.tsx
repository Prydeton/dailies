import { Redirect, Route, type RouteProps } from 'wouter'
import { useAuth } from '/src/hooks'

export const AuthRoute = ({ ...props }: RouteProps) => {
  const { session } = useAuth()
  if (session?.user) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export const NoAuthRoute = ({ ...props }: RouteProps) => {
  const { session } = useAuth()

  if (!session?.user) {
    return <Route {...props} />
  }
  return <Redirect to="/" />
}
