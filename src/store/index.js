// import { createStore } from 'redux' // 单个state处理
import { createStore, combineReducers } from 'redux'
import todos from './todo/reducer'
import auth from './auth/reducer'


const store = createStore(
  combineReducers({ todos, auth }),
)

// const store = createStore(todos)

export default store