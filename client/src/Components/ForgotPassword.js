import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Alert } from 'reactstrap'

let formdata = {
  email: '',
}

class ForgotPassword extends Component {
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

  handleFormSubmit(e) {
    e.preventDefault();
    const header = this.Auth.getToken()
    const data = {
      email: this.state.formdata.email,
    }

    axios.post(`${process.env.REACT_APP_SERVER}/api/users/forgotPassword` , data, {
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
          alert("Error sending email! May be your email doesn't exist in database! Contact your service provider")
        )
      }
    }).catch(function (error) {
      console.log(error);
    })


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
        <form className="frank" onSubmit={(e) => { this.handleFormSubmit(e) }}>
          <div className="question">
            <input type="email" value={this.state.formdata.password} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'email')} required />
            <label>Email address: </label>
          </div>

          <Button type="submit" color="primary">Send</Button>&nbsp;
        </form>
        <Alert color="primary" isOpen={this.state.collapse}>
          You will receive an password reset link if you entered correct email address! Check your mail box
        </Alert>
      </>
    );
  }
}

export default ForgotPassword;
