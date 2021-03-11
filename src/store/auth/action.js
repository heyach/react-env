export default {
  setUserInfo: (text) => {
    return {
      type: 'SET_USERINFO',
      text
    }
  },
  getUserInfo: (text) => {
    return {
      type: 'GET_USERINFO',
      text
    }
  },
}