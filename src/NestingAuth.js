import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
export default class NestingRoute extends Component {
  render() {
    const { routerConfig, location } = this.props
    const { pathname } = location
    const isLogin = localStorage.getItem("login_token")

    const targetRouterConfig = routerConfig.find((item) => {
      return item.path.replace(/\s*/g, "") === pathname
    })

    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
      const { component } = targetRouterConfig
      return <Route path={pathname} component={component} />
    }
    if (isLogin) {
      if (targetRouterConfig) {
        return (
          <Route path={pathname} component={targetRouterConfig.component} />
        )
      } else {
        return <Redirect to="/home/testRouter" />
      }
    } else {
      return <Redirect to="/login" />
    }
  }
}
