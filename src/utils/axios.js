import axios from "axios"

axios.defaults.timeout = 100000
axios.defaults.baseURL = "http://127.0.0.1:5000/"

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error)
  }
)

export default axios