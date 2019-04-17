import React, { Component } from 'react'
import AuthService from './AuthService';
import axios from 'axios';
import { Button } from 'reactstrap';
class ViewProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
    }
    this.Auth = new AuthService()
  }

  componentDidMount() {
    const header = this.Auth.getToken()
    const id = this.props.user.id
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/getUserDetails/` + id, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({
        username: response.data.data.username,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
        contactNo: response.data.data.contactNo
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
  render() {
    return (
      <div>
        <form className="login" style={{ height: "-webkit-fill-available" }}>
          Username<input type="text" value={this.state.username} disabled />
          FirstName<input type="text" value={this.state.firstName} disabled />
          LastName<input type="text" value={this.state.lastName} disabled />
          Email<input type="text" value={this.state.email} disabled />
          Contact No<input type="text" value={this.state.contactNo} disabled />
          <Button onClick={() => this.props.history.push('/user/home')} color='primary' >Home</Button>
        </form>
      </div>

    )
  }
}
export default ViewProfile;