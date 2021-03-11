import React, { Component } from "react"
import iconClose from '../../../assets/common/icon-close.png'
import "./index.scss"
import Uploader from "../../../components/uploader/Uploader"
import E from "wangeditor"
import { Select } from 'antd'
import 'antd/dist/antd.css'
import articleService from "../../../services/articleService"

class ArticleRelease extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      short_intro: "",
      tags: [],
      iptTag: "",
      uploadUrl: "http://127.0.0.1:5000/upload/uploadImage",
      imgList: [],
      editorContent: "",
      articleClassifyList: [],
      classify: ""
    }
  }
  componentDidMount() {
    let id = this.props.location.state.id
    if (id) {
      articleService.getArticleDetail({
        id: id
      }).then(res => {
        this.setState({
          articleId: id,
          title: res.data.article.title,
          short_intro: res.data.article.short_intro,
          tags: res.data.article.tags.split(""),
          classify: res.data.article.classify,
          imgList: [res.data.article.main_pic],
        })
        this.state.editor.txt.html(res.data.article.content)
      })
    }
    const elemMenu = this.refs.editorElemMenu
    const elemBody = this.refs.editorElemBody
    const editor = new E(elemMenu, elemBody)
    editor.config.uploadImgServer = this.state.uploadUrl
    editor.config.uploadFileName = "file"
    editor.config.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'image',  // 插入图片
      'table',  // 表格
      'code',  // 插入代码
    ]
    editor.create()
    this.setState({
      editor: editor
    })
    articleService.getArticleClassifyList().then(res => {
      this.setState({
        articleClassifyList: res.data
      })
    })
  }
  tagsChange(e) {
    this.setState({
      iptTag: e.target.value
    })
  }
  titleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  shortIntroChange(e) {
    this.setState({
      short_intro: e.target.value
    })
  }
  uploadSuccess(r) {
    this.setState({
      imgList: r || []
    })
  }
  delTag(index) {
    this.state.tags.splice(index, 1)
    this.setState({
      tags: this.state.tags
    })
  }
  keyUp(e) {
    let that = this
    let key = e.keyCode
    if (
      key == 188 ||
      key == 186 ||
      key == 13 ||
      key == 191 ||
      (window.navigator.userAgent.indexOf("Firefox") > 0 && key == 59)
    ) {
      let c = that.state.iptTag
      c = c.substr(0, c.length - 1)
      if (c == "" || c == undefined) {
        that.setState({
          iptTag: ""
        })
        return
      }
      that.state.tags.push(c)
      that.setState({
        iptTag: ""
      })
    }
  }
  releaseArticle() {
    let that = this
    // 不写校验了
    let data = {
      title: that.state.title,
      author_id: 1000000,
      content: that.state.editor.txt.html(),
      tags: that.state.tags.join(""),
      main_pic: that.state.imgList[0],
      classify: that.state.classify,
      short_intro: that.state.short_intro
    }
    if (that.state.articleId) {
      data.id = that.state.articleId
      articleService.updateArticle(data).then(res => {
        if (res.code == 0) {
          that.props.history.push({
            pathname: "/article/list"
          })
        }
      })
    } else {
      articleService.articleRelease(data).then(res => {
        if (res.code == 0) {
          that.props.history.push({
            pathname: "/article/list"
          })
        }
      })
    }
  }
  handleChange(e) {
    this.setState({
      classify: e
    })
  }
  render() {
    let {
      title,
      short_intro,
      tags,
      iptTag,
      articleClassifyList
    } = this.state
    const { Option } = Select
    return (
      <div className="release-article">
        <div className="release-con">
          <div className="form-item">
            <div className="label">文章标题</div>
            <div className="content">
              <input type="text" 
                value={title} 
                onChange={(e) => this.titleChange(e)} 
                placeholder="请输入文章标题，30字以内" />
            </div>
          </div>
          <div className="form-item">
            <div className="label">文章分类</div>
            <div className="content">
              <Select 
                value={this.state.classify ? this.state.classify : '请选择分类'} 
                style={{ width: 120 }} 
                onChange={(e) => this.handleChange(e)}>
                {
                  articleClassifyList.map((item, index) => {
                    return <Option value={item.id} key={index}>{item.name}</Option>
                  })
                }
              </Select>
              <span className="label-tip">先用antdesign的select</span>
            </div>
          </div>
          <div className="form-item">
            <div className="label">文章标签</div>
            <div className="content">
              <div className="article-tags" v-if="tags.length > 0">
                {
                  tags.map((item, index) => {
                    return (
                      <div className="tag-item" key={index}>
                        <img src={iconClose} onClick={() => this.delTag(index)} />
                        {item}
                      </div>
                    )
                  })
                }
              </div>
              {
                tags.length < 3 ? <input
                  type="text"
                  value={iptTag}
                  onKeyUp={(e) => this.keyUp(e)}
                  onChange={(e) => this.tagsChange(e)}
                  placeholder="请输入文章标签，以分号分隔"
                /> : null
              }
            </div>
          </div>
          <div className="form-item">
            <div className="label">文章简介</div>
            <div className="content">
              <input type="text" 
                value={short_intro} 
                onChange={(e) => this.shortIntroChange(e)} 
                placeholder="请输入文章简介，30字以内" />
            </div>
          </div>
          <div className="form-item">
            <div className="label">文章封面</div>
            <div className="content">
              <Uploader 
                imgList={this.state.imgList} 
                uploadSuccess={(r) => this.uploadSuccess(r)} 
                uploadUrl={this.state.uploadUrl}></Uploader>
              <span className="label-tip">请上传文章封面图，后续处理成带裁剪的上传组件</span>
            </div>
          </div>
          <div className="form-item article-content">
            <div className="label">文章内容</div>
            <div className="content" style={{ width: '100%' }}>
              <div className="editor">
                <div ref="editorElemMenu" className="editor-menu"></div>
                <div ref="editorElemBody" className="editor-body"></div>
              </div>
            </div>
          </div>
          <div className="btn-release" onClick={() => this.releaseArticle()}>
            {this.state.articleId ? '确认编辑' : '确认发布'}
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleRelease