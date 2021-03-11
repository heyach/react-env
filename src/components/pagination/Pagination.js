import React, { Component } from "react"
import iconLeft from "../../assets/common/icon-left.png"
import iconRight from "../../assets/common/icon-right.png"
import "./index.scss"

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageList: [],
    }
  }
  componentWillReceiveProps(newProps) {
    let t = Math.ceil(newProps.totalCount / newProps.pageSize) // 总页数
    let maxPage = newProps.currentPage + 4 > t ? t : newProps.currentPage + 4
    let minPage = maxPage - 4 > 0 ? maxPage - 4 : 1
    let p = []
    for (let i = minPage; i <= maxPage; i++) {
      p.push(i)
    }
    this.setState({
      pageList: p
    })
  }
  toPrevPage() {
    this.props.toPrevPage()
  }
  toTargetPage(e) {
    this.props.toTargetPage(e)
  }
  toNextPage() {
    this.props.toNextPage()
  }
  render() {
    let {
      currentPage,
      totalCount,
      pageSize
    } = this.props
    let {
      pageList
    } = this.state
    return (
      <div className="pagination">
        {
          currentPage > 1 ?
            <div className="page-item" onClick={() => this.toPrevPage()}>
              <img src={iconLeft} />
            </div> : null
        }
        {
          pageList.map((item, index) => {
            return (
              <div
                className={`page-item ${currentPage == item ? 'cur' : ''}`}
                key={index}
                onClick={() => this.toTargetPage(item)}
              >{item}</div>
            )
          })
        }
        {
          currentPage < totalCount / pageSize ?
            <div className="page-item" onClick={() => this.toNextPage()}>
              <img src={iconRight} />
            </div> : null
        }
      </div>
    )
  }
}
export default Pagination