
import React from 'react'
import { Link } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <>
      <input type="checkbox" class="navBtn" id="navBtn" />
      <nav>
        <ul>
          <li>
            <Link to='/admin/home/ViewProfile'><i class="fa fa-user-circle"></i> View Profile</Link>
          </li>
          <li>
            <Link to='/admin/home/IncidentMaster'><i class="fa fa-diamond"></i>Incidents</Link>
          </li>
          <li>
            <Link to='/admin/home/CategoryMaster'><i class="fa fa-cube"></i>Categories</Link>
          </li>
          <li>
            <Link to='/admin/home/ComponentMaster'><i class="fa fa-magic"></i>Components</Link>
          </li>
          <li>
            <Link to='/admin/home/ManageComponents'><i class="fa fa-heart"></i>Manage Components</Link>
          </li>
        </ul>
      </nav>

    </>
  )
}
export default AdminSidebar;

