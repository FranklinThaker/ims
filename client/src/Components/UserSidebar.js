
import React from 'react'
import { Link } from 'react-router-dom'
const UserSidebar = () => {
  return (
    <>
      <input type="checkbox" className="navBtn" id="navBtn" />
      <nav>
        <ul>
          <li>
            <Link to='/user/home/viewProfile'><i className="fa fa-user-circle"></i> View Profile</Link>
          </li>
          <li>
            <Link to='/user/home/requestComponent'><i className="fa fa-diamond"></i>Request Component</Link>
          </li>
          <li>
            <Link to='/user/home/raiseIssue'><i className="fa fa-cube"></i>Raise Issues</Link>
          </li>
          <li>
            <Link to='/user/home/viewComponentStatus'><i className="fa fa-magic"></i>View Requested Component Status</Link>
          </li>
          <li>
            <Link to='/user/home/viewIssueStatus'><i className="fa fa-heart"></i>View Raised Issue Status</Link>
          </li>
        </ul>
      </nav>

    </>
  )
}
export default UserSidebar;



