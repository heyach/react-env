import React,{ Component } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

class Todo extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 100
    }
  }
  componentDidMount(){
    this.setState({
      count: 200
    })
  }
	render(){
		return (
			<div>
				<AddTodo count={this.state.count}/>
				<TodoList />
			</div>
		)
	}
}

export default Todo