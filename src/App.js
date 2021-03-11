import React, { Component, Fragment } from 'react'
import renderRoutes from './router/renderRoutes'
import { routes } from './router/routes'
import { connect } from 'react-redux'
import Storage from './utils/Storage'
import "./App.scss"

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const userInfo = this.props.userInfo
    return (
      <Fragment>
        {renderRoutes(routes, userInfo)}
      </Fragment>
    )
  }
}

const mapStateToProps = () => {
  let userInfo = Storage.get("userInfo") || null
  return { userInfo }
}

export default connect(mapStateToProps, null)(App)