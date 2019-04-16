import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Alert, Button } from 'reactstrap';

let formdata = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNo: '',
  role: '',
  status: ''
}

class UserCRUD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      formdata: { ...formdata },
      id: null,
      flag: false,
    }
    this.ChangeUpdateValue = this.ChangeUpdateValue.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService();
  }

  ChangeUpdateValue(e, currentUser, field2) {
    console.log('....', e);
    // e.preventDefault();
    let temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }

  getData(rowId) {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/getUserDetails/` + rowId, {
      headers: {
        'Authorization': header,
      }
    })
      .then(response => {
        this.setState({
          formdata: response.data.data,
          flag: true
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentWillMount() {
    if (this.props.id !== undefined)
      this.getData(this.props.id)
  }

  handleFormSubmit(e) {
    if (this.state.flag) { ///for edit in the data
      e.preventDefault();
      const fpt = {
        username: this.state.formdata.username,
        firstName: this.state.formdata.firstName,
        lastName: this.state.formdata.lastName,
        email: this.state.formdata.email,
        contactNo: this.state.formdata.contactNo,
        role: this.state.formdata.role,
        status: this.state.formdata.status
      }
      const header = this.Auth.getToken();
      axios.put(`${process.env.REACT_APP_SERVER}/api/users/` + this.props.id, fpt, {
        headers: {
          'Authorization': header
        },
      }).then((response) => {
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
        setTimeout(() => {
          this.setState({
            collapse: false
          });
        }, 1000)
        this.props.makeData()
      })
        .catch(function (error) {
          console.log(error);
        })

    }
    else { /////for inserting new record
      e.preventDefault();
      const data = {
        username: this.state.formdata.username,
        password: this.state.formdata.password,
        firstName: this.state.formdata.firstName,
        lastName: this.state.formdata.lastName,
        email: this.state.formdata.email,
        contactNo: this.state.formdata.contactNo,
        role: this.state.formdata.role,
        status: this.state.formdata.status
      }
      const header = this.Auth.getToken();
      axios.post(`${process.env.REACT_APP_SERVER}/api/users`, data, {
        headers: {
          'Authorization': header
        },
      }).then((response) => {
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
        setTimeout(() => {
          this.setState({
            collapse: false
          });
        }, 1000)
        this.props.makeData();
      })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  render() {
    return (
      <>
        <form className="frank" onSubmit={(e) => { this.handleFormSubmit(e) }}>
        <div className="question">
        <input type="text" value={this.state.formdata.username} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'username')} required />
        <label>UserName</label>
        </div>

        {!this.state.flag &&
        <div className="question">
        <input type="password" value={this.state.formdata.password} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'password')} required />
        <label>Password</label> 
        </div>}

        <div className="question">
        <input type="text" value={this.state.formdata.firstName} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'firstName')} required />
        <label>FirstName</label>
        </div>

        <div className="question">
        <input type="text" value={this.state.formdata.lastName} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'lastName')} required />
        <label>LastName</label>
        </div>
          
        <div className="question">
        <input type="email" value={this.state.formdata.email} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'email')} required />
        <label>Email</label>
        </div>

        <div className="question">
        <input type="text" value={this.state.formdata.contactNo} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'contactNo')} minLength="10" maxLength="10" required />
        <label>Contact No</label>
        </div>

          <table>
            <tr>
              <th>Role</th>
            </tr>
            <tr>
              <td>
                Admin <input type="radio" value='true' name="role" checked={this.state.formdata.role === 'true'}
                  onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'role')} />
              </td>
              <td>
                User <input type="radio" value='false' name="role" checked={this.state.formdata.role === 'false'}
                  onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'role')} />
              </td>
            </tr>

            <th>Status</th>
            <tr>
              <td>
                Active <input type="radio" value='true' name="status" checked={this.state.formdata.status === 'true'}
                  onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'status')} />
              </td>
              <td>
                Deactive <input type="radio" value='false' name="status" checked={this.state.formdata.status === 'false'}
                  onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'status')} />
              </td>
            </tr>
          </table>

          <Button type="submit" color="primary">Update</Button>&nbsp;
        </form>

        <Alert color="primary" isOpen={this.state.collapse}>
          Your DATA has been updated!
        </Alert>
      </>
    )
  }
}
export default UserCRUD;