import Storage from '../../utils/Storage'
const todos = (state = null, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      Storage.set("todos", [
        ...state,
        {
          text: action.text,
          id: action.id,
          completed: false,
        }
      ])
      return Storage.get("todos")
    case 'REDUCE_TODO':
      action.text[action.index].completed = !action.text[action.index].completed
      Storage.set("todos", action.text)
      return Storage.get("todos")
    default:
      return state
  }
}

export default todos