import React, { Component } from 'react'
import request from 'superagent'

export default class Todos extends Component {
    state = {
        todos: [],
        todoName: '',
    }

    componentDidMount = async () => {
        const response = await request.get('https://young-sierra-73878.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)

        this.setState({ todos:response.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await request.post('https://young-sierra-73878.herokuapp.com/api/todos')
        .send({
            name: this.state.todoName,
            completed: false,
        })
        .set('Authorization', this.props.token)

        const response = request.get('https://young-sierra-73878.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    }

    render() {
        return (
            <div>
                <h2>Your To Dos</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        add a todo:
                        <input value={this.state.todoName} onChange={(e) => this.setState({ todoName: e.target.value})}/>
                        <button>
                            add todo
                        </button>
                    </label>
                </form>
                {
                    !!this.state.todos.length && this.state.todos.map(todo => <div key={todo.id}>
                        name: {todo.name}; 
                        completed: {todo.completed}
                        </div>)
                }
            </div>
        )
    }
}
