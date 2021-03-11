import React, { Component, Fragment } from "react"
import renderRoutes from '../../router/renderRoutes'
import Header from "../../components/header/Header"

class Article extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // const route = this.props.route
    // if (route.redirect) {
    //   this.props.history.push({
    //     pathname: route.redirect
    //   })
    // }
  }
  render() {
    const route = this.props.route
    return (
      <Fragment>
        <Header history={this.props.history}></Header>
        <div className="article">
          {renderRoutes(route.children)}
        </div>
      </Fragment>
    )
  }
}

export default Article