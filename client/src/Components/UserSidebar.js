
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
          {/* <a href="javascript:void(0)" className="closebtn" onClick={() => this.openNav()}>&times;</a> */}
          <Link to='' className="closebtn" onClick={() => this.openNav()}>&times; </Link>
          <Link to='/user/home/viewProfile' onClick={() => this.closeNav()}>
            {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
            View Profile
          </Link>
          <Link to='/user/home/requestComponent' className="menu-item" onClick={() => this.closeNav()}>Request Component</Link>
          <Link to='/user/home/raiseIssue' className="menu-item" onClick={() => this.closeNav()}>Raise Issue</Link>
          <Link to='/user/home/viewComponentStatus' className="menu-item" onClick={() => this.closeNav()}>Requested Component Status</Link>
          <Link to='/user/home/viewIssueStatus' className="menu-item" onClick={() => this.closeNav()}>Raised Issue Status</Link>
        </div>
        <span style={{ cursor: "pointer" }} className="openBtn" onClick={() => this.openNav()}>&#9776;</span>
      </>
    );
  }
}
export default Sidebar;

