import React, { Component } from "react"
import iconEmpty from "../../assets/common/icon-empty.png"
import "./index.scss"

class Empty extends Component {
  render() {
    return (
      <div className="empty">
        <img src={iconEmpty} className="icon-empty" />
        <span>暂无数据</span>
      </div>
    )
  }
}
export default Empty
