import React, { Component, Fragment } from "react"
import renderRoutes from '../../router/renderRoutes'
import Header from "../../components/header/Header"

class Practice extends Component {
  render(){
    const route = this.props.route
    return (
      <Fragment>
        <Header history={this.props.history}></Header>
        <div className="practice">
          {renderRoutes(route.children)}
        </div>
      </Fragment>
    )
  }
}

export default Practice