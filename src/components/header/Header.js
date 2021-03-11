import React, { Component } from 'react'
import { connect } from 'react-redux'
import Storage from '../../utils/Storage'
import logoUrl from '../../assets/common/logo.png'
import colorFulLine from '../../assets/common/colorful-line.png'
import "./index.scss"
import { Menu } from 'antd'
import menus from "./menu"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 100,
      showUserMenus: false,
      userMenus: [{
        name: "写文章",
        route: "/article/release"
      }, {
        name: "我的文章",
        route: "/user/myarticle"
      }, {
        name: "我的信息",
        route: "/user/userinfo"
      }],
      current: '',
    }
  }
  handleClick(e) {
    this.setState({ current: e.key })
    this.props.history.push({
      pathname: e.item.props.route
    })
  }
  toFunc(item) {
    this.props.history.push({
      pathname: item.route
    })
  }
  getUserMenus() {
    let userMenus = this.state.userMenus
    return (
      userMenus.map((item, index) => {
        return (
          <div
            className="menu-item"
            onClick={() => this.toFunc(item)}
            key={index}
          >{item.name}</div>
        )
      })
    )
  }
  togUserMenus(){
    this.setState({
      showUserMenus: !this.state.showUserMenus
    })
  }
  render() {
    let userInfo = this.props.userInfo
    const { current } = this.state
    const { SubMenu } = Menu
    return (
      <div className="header">
        <div className="header-con">
          <img src={logoUrl} className="logo" />
          <div className="menu-con">
          <Menu onClick={(e) => this.handleClick(e)} selectedKeys={[current]} mode="horizontal">
            {
              menus.map((item, index) => {
                if(!item.children){
                  return (
                    <Menu.Item key={index} disabled={item.disabled} route={item.route}>{item.name}</Menu.Item>
                  )
                }else{
                  return (
                    <SubMenu key={index} title={item.name}>
                      {
                        item.children.map((item2, index2) => {
                          return (
                            <Menu.Item key={`${index}-${index2}`} disabled={item.disabled} route={item2.route}>{item2.name}</Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                }
              })
            }
          </Menu>
          </div>
          <div className="userinfo" onClick={() => this.togUserMenus()}>
            <img
              className="avatar"
              src={userInfo.avatar ? userInfo.avatar : 'https://user-gold-cdn.xitu.io/2019/7/4/16bbc699faf90ff6?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'}
            />
            {
              this.state.showUserMenus ?
                <div className="user-menus">
                  {this.getUserMenus()}
                </div> : null
            }
          </div>
        </div>
        <img src={colorFulLine} className="b-line" />
      </div>
    )
  }
}

const mapStateToProps = () => {
  let userInfo = Storage.get("userInfo") || null
  return { userInfo }
}

export default connect(mapStateToProps, null)(Header)