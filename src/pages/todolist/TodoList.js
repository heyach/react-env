import React, { Component } from 'react'
import todoAction from '../../store/todo/action'
import { connect } from 'react-redux'
import Storage from '../../utils/Storage'

class TodoList extends Component {
  constructor(props) {
    super(props)
  }
  delItem(i) {
    this.props.onReduce(this.props.todos, i)
  }
  render() {
    const list = this.props.todos
    return (
      <ul>
        {
          list.map((value, index) => {
            return <li key={index} onClick={() => this.delItem(index)}>
            {value.completed ? <s>{value.text}</s> : value.text}
            </li>
          })
        }
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return { todos: Storage.get("todos") || []}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReduce: (text, index) => {
      dispatch(todoAction.reduceTodo(text, index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)