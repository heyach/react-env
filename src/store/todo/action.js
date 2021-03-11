let num = 0
export default {
  addTodo: (text) => {
    return {
      type: 'ADD_TODO',
      id: num++,
      text
    }
  },
  reduceTodo: (text, index) => {
    return {
      type: 'REDUCE_TODO',
      text,
      index
    }
  }
}