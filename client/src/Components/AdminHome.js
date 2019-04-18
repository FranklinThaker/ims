import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';

import Navbar from './Navbar';
import ViewProfile from './ViewProfile';
import IncidentsMaster from './IncidentsMaster';
import CategoryMaster from './CategoryMaster';
import UserMaster from './UserMaster';
import ComponentsMaster from './ComponentsMaster';
import ManageComponents from './ManageComponents';

const Auth = new AuthService();

class AdminHome extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/');
  }

  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div id='wrapper'>
          <div id="content-wrapper" >
            <p>{process.env.REACT_APP_SERVER}</p>
            <Route path='/admin/home/ViewProfile' render={() => (<ViewProfile {...this.props} />)} />
            <Route path='/admin/home/IncidentMaster' render={() => (<IncidentsMaster {...this.props} />)} />
            <Route path='/admin/home/CategoryMaster' render={() => (<CategoryMaster {...this.props} />)} />
            <Route path='/admin/home/UserMaster' render={() => (<UserMaster {...this.props} />)} />
            <Route path='/admin/home/ComponentMaster' render={() => (<ComponentsMaster {...this.props} />)} />
            <Route path='/admin/home/ManageComponents' render={() => (<ManageComponents {...this.props} />)} />
            
          </div>
        </div>

      </>
    )
  }
}

export default withAuth(AdminHome);