import React, { Component } from "react"
import uploadFiles from "./post"
import iconAdd from '../../assets/common/icon-add.png'
import "./index.scss"

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  uploadImage(e) {
    let that = this,
      file = e.target.files[0]
    if (file) {
      uploadFiles(that.props.uploadUrl, file, res => {
        that.props.uploadSuccess(res.data)
      })
    }
  }
  render() {
    let { imgList } = this.props
    return (
      <div className="c-uploader">
        <div className="images">
          {
            imgList.map((item, index) => {
              return (
                <img src={item} key={index}/>
              )
            })
          }
        </div>
        <div className="btn-upload">
          {
            imgList.length == 0 ? <img src={iconAdd} /> : null
          }
          <input onChange={(e) => this.uploadImage(e)} className="ipt-uploader" type="file" accept="image/*" />
        </div>
      </div>
    )
  }
}

export default Uploader