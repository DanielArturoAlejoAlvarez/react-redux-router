import React, { Component } from 'react'

import axios from 'axios'

export default class Registration extends Component {
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: "",
            password_confirmation: "",
            registrationsErrors: ""
        }

        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        console.log('form submitted!!') 
        const { email,password,password_confirmation }=this.state
        axios.post("http://127.0.0.1:3001/registrations", {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        }, { withCredentials: true }) 
        .then(resp=>{
            console.log('Registration resp', resp)
            if(resp.data.status==='created'){
                this.props.handleSuccessfulAuth(resp.data)
            }
        })
        .catch(err=>{
            console.log('Registration err', err)
        })      
    }

    handleChange(e){
        //console.log('handle change', e)
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
                    <input 
                    type="password" 
                    name="password_confirmation"
                    placeholder="Password"
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                    required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}
