export default {
  get(storeKey) {
    return JSON.parse(localStorage.getItem(storeKey))
  },
  set(storeKey, item) {
    localStorage.setItem(storeKey, JSON.stringify(item))
  }
}