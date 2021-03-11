import React, { Component } from "react"
import Empty from "../../../components/empty/Empty"
import articleService from "../../../services/articleService"
import "./index.scss"
import Pagination from "../../../components/pagination/Pagination"

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      offset: 0,
      limit: 8,
      count: 0,
      articleList: []
    }
  }
  componentDidMount() {
    this.getArticleList()
  }
  toDetail(id) {
    this.props.history.push({
      pathname: `/article/detail/${id}`
    })
  }
  getArticleList() {
    articleService.getArticleList({
      params: {
        offset: (this.state.currentPage - 1) * this.state.limit,
        limit: this.state.limit
      }
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          count: res.count,
          articleList: res.data || []
        })
      }
    })
  }
  toTargetPage(e) {
    let that = this
    that.state.currentPage = e
    that.getArticleList()
  }
  toNextPage() {
    let that = this
    that.state.currentPage++
    that.getArticleList()
  }
  toPrevPage() {
    let that = this
    that.state.currentPage--
    that.getArticleList()
  }
  render() {
    let {
      articleList,
      currentPage,
      count,
      limit
    } = this.state
    return (
      <div className="article-list">
        {
          articleList.length == 0 ? <Empty></Empty> :
            <div className="article-con">
              {
                articleList.map((item, index) => {
                  return (
                    <div
                      className="article-item"
                      key={index}
                      onClick={() => this.toDetail(item.id)}
                    >
                      <div className="top-info">
                        <img src={item.main_pic} className="article-main-pic" />
                        <div className="tags">
                          {
                            item.tags.split(";").map((item2, index2) => {
                              return (
                                <div className="tag" key={index2}>{item2}</div>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="info">
                        <div className="title">{item.title}</div>
                        <div className="short-intro">{item.short_intro}</div>
                        <div className="ctime">{item.createdAt}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        }
        {
          <Pagination
            toNextPage={() => this.toNextPage()}
            toPrevPage={() => this.toPrevPage()}
            toTargetPage={(e) => this.toTargetPage(e)}
            currentPage={currentPage}
            totalCount={count}
            pageSize={limit}
          ></Pagination>
        }
      </div>
    )
  }
}

export default ArticleList