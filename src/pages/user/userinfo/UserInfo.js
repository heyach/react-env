import React, { Component } from "react"
import { connect } from 'react-redux'
import "./index.scss"
import userService from "../../../services/userService"
import Uploader from "../../../components/uploader/Uploader"
import Storage from '../../../utils/Storage'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      uploadUrl: "http://127.0.0.1:5000/upload/uploadImage",
      imgList: [],
    }
  }
  componentDidMount() {
    userService.getUserInfo({
      id: this.props.userInfo.uid
    }).then(res => {
      this.setState({
        userInfo: res.data,
        imgList: [res.data.avatar]
      })
    })
  }
  save() {
    let that = this
    userService.saveUserInfo({
      uid: that.state.userInfo.uid,
      name: that.state.userInfo.name,
      password: that.state.userInfo.password,
      realname: that.state.userInfo.realname,
      address: that.state.userInfo.address,
      mobile: that.state.userInfo.mobile,
      notes: that.state.userInfo.notes,
      avatar: that.state.imgList[0]
    }).then(res => {
      console.log(res)
    })
  }
  nameChange(e) {
    this.state.userInfo.name = e.target.value
    this.setState({
      userInfo: this.state.userInfo
    })
  }
  pwdChange(e) {
    this.state.userInfo.password = e.target.value
    this.setState({
      userInfo: this.state.userInfo
    })
  }
  realnameChange(e) {
    this.state.userInfo.realname = e.target.value
    this.setState({
      userInfo: this.state.userInfo
    })
  }
  mobileChange(e) {
    this.state.userInfo.mobile = e.target.value
    this.setState({
      userInfo: this.state.userInfo
    })
  }
  addressChange(e) {
    this.state.userInfo.address = e.target.value
    this.setState({
      userInfo: this.state.userInfo
    })
  }
  notesChange(e) {
    this.state.userInfo.notes = e.target.value
    this.setState({
      userInfo: this.state.userInfo
    })
  }
  uploadSuccess(r){
    this.setState({
      imgList: r || []
    })
  }
  render() {
    let userInfo = this.state.userInfo
    return (
      <div className="userinfo">
        <div className="userinfo-con">
          <div className="basic-info">
            <div className="title">????????????</div>
            <div className="info-item">
              <div className="label">??????</div>
              <div className="content">
                {/* ??????????????????????????????value???undefined???????????????????????????input???????????????????????????
                ???????????????????????? */}
                <input type="text" value={userInfo.name || ''} onChange={(e) => this.nameChange(e)} />
              </div>
            </div>
            <div className="info-item">
              <div className="label">??????</div>
              <div className="content">
                <Uploader 
                  imgList={this.state.imgList} 
                  uploadSuccess={(r) => this.uploadSuccess(r)} 
                  uploadUrl={this.state.uploadUrl}></Uploader>
              </div>
            </div>
            <div className="info-item">
              <div className="label">????????????</div>
              <div className="content">
                <input type="text" value={userInfo.password || ''} onChange={(e) => this.pwdChange(e)} />
              </div>
            </div>
            <div className="info-item">
              <div className="label">????????????</div>
              <div className="content">
                <input type="text" value={userInfo.realname || ''} onChange={(e) => this.realnameChange(e)} />
              </div>
            </div>
            <div className="info-item">
              <div className="label">????????????</div>
              <div className="content">
                <input type="text" value={userInfo.mobile || ''} onChange={(e) => this.mobileChange(e)} />
              </div>
            </div>
            <div className="info-item">
              <div className="label">????????????</div>
              <div className="content">
                <input type="text" value={userInfo.address || ''} onChange={(e) => this.addressChange(e)} />
              </div>
            </div>
            <div className="info-item">
              <div className="label">??????</div>
              <div className="content">
                <textarea value={userInfo.notes || ''} onChange={(e) => this.notesChange(e)}></textarea>
              </div>
            </div>
          </div>
          <div className="btn-save" onClick={() => this.save()}>??????</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let userInfo = state.auth || Storage.get("userInfo")
  return { userInfo }
}

export default connect(mapStateToProps, null)(UserInfo)