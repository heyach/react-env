import Storage from '../../utils/Storage'
const auth = (state = null, action) => {
  switch (action.type) {
    case 'SET_USERINFO':
      Storage.set("userInfo", action.text)
      return Storage.get("userInfo")
    default:
      return state
  }
}

export default auth