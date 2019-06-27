import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './Home'
import Dashboard from './Dashboard'

export default class App extends Component {
  constructor(){
    super()
    this.state={
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin=this.handleLogin.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
  }

  componentDidMount(){
    this.checkLoginStatus()
  }

  checkLoginStatus(){
    axios.get('http://127.0.0.1:3001/logged_in', { withCredentials: true })
      .then(response=>{
        if(response.data.logged_in && this.state.loggedInStatus==="NOT_LOGGED_IN"){
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          })
        }else if(!response.data.logged_in & this.state.loggedInStatus==="LOGGED_IN"){
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          })
        }
      })
      .catch(err=>{
        console.log('check login error', err)
      })
  }  

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }


  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
        <Route 
        exact 
        path={"/"} 
        render={props=>(
        <Home 
        {...props} 
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout} 
        loggedInStatus={this.state.loggedInStatus}
        />
        )}
        />
        <Route 
        exact 
        path={"/dashboard"} 
        render={props=>(
        <Dashboard 
        {...props} 
        loggedInStatus={this.state.loggedInStatus}
        />
        )}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
