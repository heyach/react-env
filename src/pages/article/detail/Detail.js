import React, { Component } from "react"
import "./index.scss"
import articleService from "../../../services/articleService"

class ArticleDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleDetail: {},
      articleAuthor: {},
      articleTags: [],
      userInfo: {
        uid: 1000000,
        name: "hey",
        avatar: "http://img2.mukewang.com/5ff529550925a7bd05400304.png"
      },
      articleComments: [],
      commentContent: ""
    }
  }
  componentDidMount() {
    let id = this.props.match.params.id
    this.getArticleDetail(id)
  }
  editArticle() {
    this.props.history.push({
      pathname: "/article/release",
      state: {
        id: this.state.articleDetail.id
      }
    })
  }
  comment() {
    let that = this
    if (!that.state.userInfo.uid) {
      console.log("去登录")
      return
    } else {
      articleService.commentArticle({
        article_id: that.state.articleDetail.id,
        user_id: that.state.userInfo.uid,
        user_name: that.state.userInfo.name,
        user_head_pic: that.state.userInfo.avatar,
        content: that.state.commentContent
      }).then(res => {
        console.log(res)
        if (res.code == 0) {
          that.state.articleComments.unshift(res.data)
          that.setState({
            commentContent: ""
          })
        }
      })
    }
  }
  commentChange(e){
    this.setState({
      commentContent: e.target.value
    })
  }
  getArticleDetail(id) {
    articleService.getArticleDetail({
      id: id
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          articleTags: res.data.article.tags.split(";"),
          articleDetail: res.data.article,
          articleAuthor: res.data.author,
          articleComments: res.data.comments
        })
      }
    })
  }
  render() {
    let {
      articleDetail,
      articleTags,
      userInfo,
      articleAuthor,
      articleComments,
      commentContent
    } = this.state
    return (
      <div className="article-detail">
        <div className="article-header">
          <img src={articleAuthor.avatar} className="avatar" />
          <div className="author-info">
            <div className="username">{articleAuthor.name}</div>
            <div className="create-time">{articleAuthor.createdAt}</div>
          </div>
          <div className="article-tags">
            {
              articleTags.map((item, index) => {
                return (
                  <div className="tag-item" key={index}>{item}</div>
                )
              })
            }
          </div>
        </div>
        <div className="article-con">
          <div className="title">
            {articleDetail.title}
            {
              articleDetail.author_id == userInfo.uid ?
                <div
                  className="btn-toedit"
                  onClick={() => this.editArticle()}
                >编辑</div> : null
            }
          </div>
          <div className="short-intro">{articleDetail.short_intro}</div>
          <div className="content" dangerouslySetInnerHTML={{ __html: articleDetail.content }}></div>
        </div>
        <div className="article-comment">
          <div className="add-comment">
            <input type="text" value={commentContent} onChange={(e) => this.commentChange(e)} className="ipt-comment" />
            <div className="btn-comment" onClick={() => this.comment()}>评论一发</div>
          </div>
          {
            articleComments.length > 0 ? <div className="comments">
              {
                articleComments.map((item, index) => {
                  return (
                    <div className="comment-item" key={index}>
                      <div className="item-userinfo">
                        <div className="item-userimg">
                          <img src={item.user_head_pic} />
                        </div>
                        <div className="item-username">{item.user_name}</div>
                        <div className="item-time">{item.createdAt}</div>
                      </div>
                      <div className="item-content">{item.content}</div>
                      <div className="item-bottom-info">
                        <div className="item-up-num">
                          赞 {item.up_num}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div> : null
          }
        </div>
      </div>
    )
  }
}

export default ArticleDetail