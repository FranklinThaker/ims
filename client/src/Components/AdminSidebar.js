
import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  openNav() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  closeNav() {
    this.setState({ isOpen: false })
  }
  render() {
    return (
      <>
        <div id="mySidenav" style={{ width: this.state.isOpen ? '250px' : '0px' }} className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={() => this.openNav()}>&times;</a>
          <Link to='' className="closebtn" onClick={() => this.openNav()}>&times; </Link>
          <Link to='/admin/home/ViewProfile' onClick={() => this.closeNav()}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            View Profile
          </Link>
          <Link to='/admin/home/IncidentMaster' className="menu-item" onClick={() => this.closeNav()}>Incidents</Link>
          <Link to='/admin/home/CategoryMaster' className="menu-item" onClick={() => this.closeNav()}>Categories</Link>
          <Link to='/admin/home/UserMaster' className="menu-item" onClick={() => this.closeNav()}>Users</Link>
          <Link to='/admin/home/ComponentMaster' className="menu-item" onClick={() => this.closeNav()}>Components</Link>
          <Link to='/admin/home/ManageComponents' className="menu-item" onClick={() => this.closeNav()}>Manage Components</Link>
        </div>
        <span style={{ cursor: "pointer" }} className="openBtn" onClick={() => this.openNav()}>&#9776;</span>

        
      </>
    );
  }
}
export default Sidebar;

