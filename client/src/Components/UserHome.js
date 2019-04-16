import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';

import Navbar from './Navbar';

import ViewProfile from './ViewProfile';
import RequestComponent from './RequestComponent'
import RaiseIssue from './RaiseIssue';
import ViewComponentStatus from './ViewComponentStatus';
import ViewIssueStatus from './ViewIssueStatus';

const Auth = new AuthService();

class UserHome extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/');
  }

  changeVisibility() {
    this.setState({ toggle: true })
  }
  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div id='wrapper'>
          <div id="content-wrapper" >
            <Route path='/user/home/viewProfile' render={() => (<ViewProfile {...this.props} />)} />
            <Route path='/user/home/requestComponent' render={() => (<RequestComponent {...this.props} />)} />
            <Route path='/user/home/raiseIssue' render={() => (<RaiseIssue {...this.props} />)} />
            <Route path='/user/home/viewComponentStatus' render={() => (<ViewComponentStatus {...this.props} />)} />
            <Route path='/user/home/viewIssueStatus' render={() => (<ViewIssueStatus {...this.props} />)} />
          </div>
        </div>

      </>
    )
  }
}

export default withAuth(UserHome);