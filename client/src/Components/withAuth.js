import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(process.env.REACT_APP_SERVER);
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/')
      }
      else {
        if(Auth.getRole())
        {
          this.props.history.replace('/admin/home')
        }
        else{
          this.props.history.replace('/user/home')
        }
        try {
          const profile = Auth.getProfile()
          this.setState({
            user: profile
          })
        }
        catch (err) {
          Auth.logout()
          this.props.history.replace('/')
        }
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        )
      }
      else {
        return null
      }
    }
  }
}