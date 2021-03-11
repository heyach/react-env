import React, { Component } from "react"
import axios from '../../utils/axios'
import authAction from '../../store/auth/action'
import { connect } from 'react-redux'
import Storage from '../../utils/Storage'
import "./index.scss"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      pwd: ""
    }
  }
  iptNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  iptPwdChange(e) {
    this.setState({
      pwd: e.target.value
    })
  }
  pwdFocus() {
    this.refs.pwd.focus()
  }
  login2() {
    let that = this
    axios.get('login/login', {
      params: {
        name: that.state.name,
        password: that.state.pwd
      }
    })
      .then(res => {
        if (res.code == 0) {
          that.props.setUserInfo(res.data)
          that.props.history.push({
            pathname: "/home"
          })
        } else {
          console.log(res.msg)
        }
      })
  }
  render() {
    return (
      <div className="login">
        <div className="bg-gradient"></div>
        <div className="login-con">
          <div className="shadow">
            <div className="shadows1"></div>
            <div className="shadows2"></div>
            <div className="shadows3"></div>
            <div className="shadows4"></div>
          </div>
          <div className="cnt">
            <input type="text" value={this.state.name} onChange={(e) => this.iptNameChange(e)} className="ipt-name" placeholder="用户名" />
            <input type="text" ref="pwd" value={this.state.pwd} onChange={(e) => this.iptPwdChange(e)} className="ipt-pwd" maxLength="6" />
            <div className="kl" onClick={() => this.pwdFocus()}>
              {this.state.pwd.length > 0 ? <div className="circle"></div> : null}
            </div>
            <div className="kl" onClick={() => this.pwdFocus()}>
              {this.state.pwd.length > 1 ? <div className="circle"></div> : null}
            </div>
            <div className="kl" onClick={() => this.pwdFocus()}>
              {this.state.pwd.length > 2 ? <div className="circle"></div> : null}
            </div>
            <div className="kl" onClick={() => this.pwdFocus()}>
              {this.state.pwd.length > 3 ? <div className="circle"></div> : null}
            </div>
            <div className="kl" onClick={() => this.pwdFocus()}>
              {this.state.pwd.length > 4 ? <div className="circle"></div> : null}
            </div>
            <div className="kl" onClick={() => this.pwdFocus()}>
              {this.state.pwd.length > 5 ? <div className="circle"></div> : null}
            </div>
          </div>
          <div className="btn-login" onClick={() => this.login2()}>登录/注册</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (text) => {
      dispatch(authAction.setUserInfo(text))
    }
  }
}
export default connect(null, mapDispatchToProps)(Login)