
import React from 'react'
import { Link } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <>
      <input type="checkbox" className="navBtn" id="navBtn" />
      <nav>
        <ul>
          <li>
            <Link to='/admin/home/ViewProfile'><i className="fa fa-user-circle"></i> View Profile</Link>
          </li>
          <li>
            <Link to='/admin/home/IncidentMaster'><i className="fa fa-diamond"></i>Incidents</Link>
          </li>
          <li>
            <Link to='/admin/home/CategoryMaster'><i className="fa fa-cube"></i>Categories</Link>
          </li>
          <li>
            <Link to='/admin/home/ComponentMaster'><i className="fa fa-magic"></i>Components</Link>
          </li>
          <li>
            <Link to='/admin/home/ManageComponents'><i className="fa fa-heart"></i>Manage Components</Link>
          </li>
        </ul>
      </nav>

    </>
  )
}
export default AdminSidebar;

