import axios from 'axios'
import interfaces from './interface'

const getUserInfo = (params) => {
  return axios.get(`${interfaces.user.getUserInfo}${params.id}`, params)
}

const saveUserInfo = (params) => {
  return axios.post(interfaces.user.saveUserInfo, params)  
}

export default {
  getUserInfo,
  saveUserInfo
}