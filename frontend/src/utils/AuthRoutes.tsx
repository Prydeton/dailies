import React from 'react'
import { Redirect, Route, RouteProps } from 'wouter'

import { useAuth } from '/src/hooks'

export const AuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { session } = useAuth()
  if (session?.user) {
    return <Route {...props} />
  } else {
    return <Redirect to="/login" />
  }
}

export const NoAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { session } = useAuth()
  if (!session?.user) {
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}
