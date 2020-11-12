import React, { Component } from 'react'
import request from 'superagent'

export default class SignUp extends Component {
    state = {
        email:'',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading:true })

        //TODO make and new account, then take user to home page with their new token
        const user = await request
        .post('https://young-sierra-73878.herokuapp.com/auth/signup')
        .send(this.state)

        console.log(user.body)
        this.setState({ loading:false })

        this.props.usernameTokenCallback(user.body.email, user.body.token)
        this.props.history.push('/todos')
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        UserName:
                    <input 
                    onChange={(e) => this.setState({ email: e.target.value})} 
                    value={this.state.email} 
                    />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value})} 
                        value={this.state.password} 
                        type="password"
                        />
                    </label>
                    {
                        this.state.loading
                        ? 'loading'
                        : <button>
                            Submit
                        </button>
                    }
                </form>
            </div>
        )
    }
}
