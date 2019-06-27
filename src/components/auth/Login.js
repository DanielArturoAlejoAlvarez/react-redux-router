import React, { Component } from 'react'

import axios from 'axios'

export default class Registration extends Component {
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: "",
            loginErrors: ""
        }

        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        
        const { email,password }=this.state
        axios.post("http://127.0.0.1:3001/sessions", {
            user: {
                email: email,
                password: password
            }
        }, { withCredentials: true }) 
        .then(response=>{
            console.log('response login', response)
            if(response.data.logged_in){
                this.props.handleSuccessfulAuth(response.data)
            }
        })
        .catch(err=>{
            console.log('Login err', err)
        })      
    }

    handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="email" 
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    />
                    <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}
