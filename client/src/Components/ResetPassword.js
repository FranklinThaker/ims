import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Alert } from 'reactstrap'

let formdata = {
  password: '',
  confirmPassword: ''
}

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formdata: { ...formdata },
      collapse: false,
    }
    this.Auth = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.ChangeUpdateValue = this.ChangeUpdateValue.bind(this);
  }

  componentWillMount() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/` + this.props.match.params.token, {
      headers: {
        'Authorization': header
      }
    }).then((response) => {
      console.log(response.data)
      if (!response.data.status) {
        alert("THis link has been expired!")
        this.props.history.push('/')
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const header = this.Auth.getToken()
    const data = {
      password: this.state.formdata.password,
      confirmPassword: this.state.formdata.confirmPassword
    }

    if (data.password === data.confirmPassword) {
      axios.post(`${process.env.REACT_APP_SERVER}/` + this.props.match.params.token, data, {
        headers: {
          'Authorization': header
        }
      }).then((response) => {
        console.log(response.data)
        if (response.status) {
          if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
          setTimeout(() => {
            this.setState({
              collapse: false
            });
          }, 5000)

        }
        else {
          return (
            alert("This link has been expired!")
          )
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    else {
      return (
        alert("Password not matched!")
      )

    }
  }

  ChangeUpdateValue(e, currentUser, field2) {
    e.preventDefault();
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }

  render() {
    return (
      <>
        <form className="login" onSubmit={(e) => { this.handleFormSubmit(e) }}>
          
            <label>New Password</label>
            <input type="password" value={this.state.formdata.password} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'password')} required />
          
            <label>Confirm Password</label>
            <input type="password" value={this.state.formdata.confirmPassword} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'confirmPassword')} required />
          <Button type="submit" color="primary">Update</Button>&nbsp;
        </form>
        <Alert color="primary" isOpen={this.state.collapse}>
          Your New Password has been updated!
        </Alert>
      </>
    );
  }
}

export default ResetPassword;
