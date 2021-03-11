import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
const renderRoutes = (routes, extraProps, switchProps) => {
  if (extraProps === void 0) {
    extraProps = {}
  }

  if (switchProps === void 0) {
    switchProps = {}
  }
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            // route.children && route.redirect && exact ...
            document.title = route.title ? route.title : route.component.name
            if (route.auth && !extraProps) {
              return <Redirect to={{ pathname: route.authRoute, state: { from: props.location } }} />
            }
            return <route.component {...props} {...extraProps} route={route} />
          }}
        />
      ))}
    </Switch>
  ) : null
}
export default renderRoutes