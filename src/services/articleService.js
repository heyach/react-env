import axios from 'axios'
import interfaces from './interface'

const articleRelease = (params) => {
  return axios.post(interfaces.article.articleRelease, params)
}

const getArticleClassifyList = (params) => {
  return axios.get(interfaces.article.getArticleClassifyList, params)
}

const getArticleDetail = (params) => {
  return axios.get(`${interfaces.article.getArticleDetail}${params.id}`, params)
}

const getArticleList = (params) => {
  return axios.get(interfaces.article.getArticleList, params)
}

const commentArticle = (params) =>{
  return axios.post(interfaces.article.commentArticle, params)
}

const updateArticle = (params) => {
  return axios.post(interfaces.article.updateArticle, params)
}

export default {
  articleRelease,
  getArticleList,
  getArticleClassifyList,
  getArticleDetail,
  commentArticle,
  updateArticle
}