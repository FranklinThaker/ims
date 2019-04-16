import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import UserCRUD from './UserCRUD';
let formdata = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNo: '',
  role: false,
  status: false,
}

class UserMaster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false,
      modalEdit: false,
      formdata: { ...formdata },
      id: null
    }
    this.toggleAdd = this.toggleAdd.bind(this);
    this.makeData = this.makeData.bind(this)
    this.Auth = new AuthService();
  }

  toggleAdd() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }));
  }

  toggleEdit(rowId) {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit,
      id: rowId
    }));
  }

  makeData() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/list`, {
      headers: {
        'Authorization': header
      }
    }).then((response) => {
      this.setState({
        data: response.data.data
      })
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentWillMount() {
    this.makeData();
  }


  handleDelete(rowId) {
    const header = this.Auth.getToken();
    axios.delete(`${process.env.REACT_APP_SERVER}/api/users/` + rowId, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      this.makeData();
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  renderEditUserModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Edit User</ModalHeader>
        <ModalBody>
          <UserCRUD id={this.state.id} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.toggleEdit(e) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderAddUserModal() {
    return (
      <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
        <ModalHeader toggle={this.toggleAdd}>Add New User</ModalHeader>
        <ModalBody>
          <UserCRUD makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    return (
      <>
        <Button type="submit" color="primary" onClick={this.toggleAdd}>Add New User</Button>&nbsp;
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "User Details",
              columns: [
                {
                  Header: "User ID",
                  accessor: "id"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Username",
                  accessor: "username"
                },
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                },
                {
                  Header: "email",
                  accessor: "email"
                },
                {
                  Header: "Contact No",
                  accessor: "contactNo"
                },
                {
                  Header: "role",
                  id: "role",
                  accessor: d => String(d.role)
                },
                {
                  Header: "status",
                  id: "status",
                  accessor: d => String(d.status)
                },
                {
                  Header: '',
                  Cell: row => (
                    <>
                      {<><Button color='primary' onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i></Button>&nbsp;</>}
                      {<Button color='danger' onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i></Button>}
                    </>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        {this.renderEditUserModal()}
        {this.renderAddUserModal()}
      </>

    )
  }
}
export default UserMaster;