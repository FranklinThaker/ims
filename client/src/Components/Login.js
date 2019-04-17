import React, { Component } from 'react';
import AuthService from './AuthService';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../images/bacancy-technology2.png'
import '../css/Login.css'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pword: '',
      collapse: false
    }

    this.Auth = new AuthService();
    this.handleLogin = this.handleLogin.bind(this);
    this.ChangeValue = this.ChangeValue.bind(this);
  }


  componentWillMount() {
    if (this.Auth.loggedIn()) {
      if (this.Auth.getRole())
        this.props.history.replace('/admin/home');
      else
        this.props.history.replace('/user/home');
    }
  }

  handleLogin(e) {
    e.preventDefault();

    this.Auth.login(this.state.uname, this.state.pword)
      .then(res => {
        let role = res.user.role;
        if (role)
          this.props.history.replace('/admin/home');
        else
        console.log('routing from login to home');
          this.props.history.replace('/user/home');
      })
      .catch(err => {
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
      })
  }

  ChangeValue(e, field) {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
    this.setState({ collapse: false });
  }


  componentDidMount() {
    // var working = false;
    // $('.login').on('submit', function (e) {
    //   e.preventDefault();
    //   if (working) return;
    //   working = true;
    //   var $this = $(this),
    //     $state = $this.find('button > .state');
    //   $this.addClass('loading');
    //   $state.html('Authenticating');
    //   setTimeout(function () {
    //     $this.addClass('ok');
    //     $state.html('Welcome back!');
    //     setTimeout(function () {
    //       $state.html('Log in');
    //       $this.removeClass('ok loading');
    //       working = false;
    //     }, 4000);
    //   }, 3000);
    // });
  }
  render() {
    return (
      <>
        <div>
          <form className="login" onSubmit={(e) => this.handleLogin(e)}>
            <img src={logo} alt='no logo found' ></img>
            <input type="text" value={this.state.uname} onChange={(e) => this.ChangeValue(e, 'uname')} placeholder="Username" onClick={() => this.setState({ uname: '' })} required />
            <i className="fa fa-user"></i>
            <input type="password" value={this.state.pword} onChange={(e) => this.ChangeValue(e, 'pword')} placeholder="Password" onClick={() => this.setState({ pword: '' })} required />
            <i className="fa fa-key"></i>
            <Link to="/ForgotPassword">Forgot your password?</Link>
            <br/>
            <Button color="primary">Log In!</Button>

          </form>
          <Alert color="danger" isOpen={this.state.collapse}>
            Invaild Username or Password!
          </Alert>
        </div>
      </>

    )
  }
}

export default Login;
