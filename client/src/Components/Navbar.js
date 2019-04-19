import React, { Component } from "react";
import AuthService from './AuthService';
import withAuth from './withAuth';
import UserSidebar from './UserSidebar';
import AdminSidebar from './AdminSidebar';
import "../App.css"
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
const Auth = new AuthService();

class Navbar extends Component {
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

        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <Link className="navbar-brand mr-1" to="/user/home"><img alt="Not Found:(" src={require("../images/bacancy-technology2.png")} height="40px" width="200px" /></Link>
         {this.props.user.role ? <AdminSidebar /> : <UserSidebar />} 
         
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"></input>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger">9+</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger">7</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow">
              <Link className="nav-link dropdown-toggle" to="" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.user.username}<i className="fas fa-user-circle fa-fw"></i>
              </Link>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <Link className="dropdown-item" to="#">Settings</Link>
                <Link className="dropdown-item" to="#">Activity Log</Link>
                <div className="dropdown-divider"></div>
                <Button color='danger' onClick={this.handleLogout.bind(this)} >Logout</Button>
              </div>
            </li>
          </ul>
        </nav>   
      </>
    );
  }
}

export default withAuth(Navbar);