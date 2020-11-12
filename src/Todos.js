import React, { Component } from 'react'
import request from 'superagent'

export default class Todos extends Component {
    state = {
        todos: [],
        todoName: '',
        loading: false,
    }

    fetchTodos = async () => {
        await this.setState({ loading: true })
        const response = await request.get('https://young-sierra-73878.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
        await this.setState({ loading: false })

    }

    componentDidMount = async () => {
        await this.fetchTodos();
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await this.setState({ loading: true })
        await request.post('https://young-sierra-73878.herokuapp.com/api/todos')
        .send({
            name: this.state.todoName,
            completed: false,
        })
        .set('Authorization', this.props.token)

        await this.fetchTodos();
    }

    handleCompleted = async (someId) => {
        await request.put(`https://young-sierra-73878.herokuapp.com/api/todos/${someId}`)
        .set('Authorization', this.props.token)

        await this.fetchTodos();
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
                    this.state.loading 
                        ? 'LOADING'
                        : this.state.todos.map(todo => <div key={todo.id}>
                        Task Name: {todo.name}<br/>
                        {todo.completed}
                        {
                            todo.completed ? 'You did it!' : <button onClick={() => this.handleCompleted(todo.id)}>Task Finished</button>
                        }
                        </div>)
                }
            </div>
        )
    }
}
