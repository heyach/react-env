import React, { Component, Fragment } from "react"
import renderRoutes from '../../router/renderRoutes'
import Header from "../../components/header/Header"

class User extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const route = this.props.route
    // 做默认跳转的话不可以在render里进行，因为会改变props.history的值，而render不允许这样做
    // 即使用Redirect也不可以
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
        <div className="user">
          {renderRoutes(route.children)}
        </div>
      </Fragment>
    )
  }
}

export default User