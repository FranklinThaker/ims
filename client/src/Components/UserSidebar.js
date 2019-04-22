
import React from 'react'
import { Link } from 'react-router-dom'
const UserSidebar = () => {
  return (
    <>
      <input type="checkbox" class="navBtn" id="navBtn" />
      <nav>
        <ul>
          <li>
            <Link to='/user/home/viewProfile'><i class="fa fa-user-circle"></i> View Profile</Link>
          </li>
          <li>
            <Link to='/user/home/requestComponent'><i class="fa fa-diamond"></i>Request Component</Link>
          </li>
          <li>
            <Link to='/user/home/raiseIssue'><i class="fa fa-cube"></i>Raise Issues</Link>
          </li>
          <li>
            <Link to='/user/home/viewComponentStatus'><i class="fa fa-magic"></i>View Requested Component Status</Link>
          </li>
          <li>
            <Link to='/user/home/viewIssueStatus'><i class="fa fa-heart"></i>View Raised Issue Status</Link>
          </li>
        </ul>
      </nav>

    </>
  )
}
export default UserSidebar;



