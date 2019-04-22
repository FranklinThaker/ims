import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import {Row, Col} from 'reactstrap';
import AuthService from './AuthService';
import withAuth from './withAuth';

import ViewProfile from './ViewProfile';
import RequestComponent from './RequestComponent'
import RaiseIssue from './RaiseIssue';
import ViewComponentStatus from './ViewComponentStatus';
import ViewIssueStatus from './ViewIssueStatus';
import UserSidebar from './UserSidebar';
import UserNavbar from './UserNavbar';

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
        <BrowserRouter>
          <>
            <UserNavbar {...this.props} />
            <Row className='rowNew'>
              <UserSidebar />
              <Col className='rowNew'>
                <Route path='/user/home/viewProfile' render={() => (<ViewProfile {...this.props} />)} />
                <Route path='/user/home/requestComponent' render={() => (<RequestComponent {...this.props} />)} />
                <Route path='/user/home/raiseIssue' render={() => (<RaiseIssue {...this.props} />)} />
                <Route path='/user/home/viewComponentStatus' render={() => (<ViewComponentStatus {...this.props} />)} />
                <Route path='/user/home/viewIssueStatus' render={() => (<ViewIssueStatus {...this.props} />)} />
              </Col>
            </Row>
          </>
        </BrowserRouter>
      </>
    )
  }
}

export default withAuth(UserHome);