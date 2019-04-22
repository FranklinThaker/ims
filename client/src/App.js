import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Components/Login'
import UserHome from './Components/UserHome';
import AdminHome from './Components/AdminHome';
import Footer from './Components/Footer';
import './App.css';
import ResetPassword from './Components/ResetPassword';
import ForgotPassword from './Components/ForgotPassword';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <>
            <Route exact path='/' component={Login} />
            <Route path='/user/home' render={props => <UserHome {...props} />} />
            <Route path='/admin/home' render={props => <AdminHome {...props} />} />
            <Route exact path='/reset/:token' render={props => <ResetPassword {...props} />} />
            <Route exact path='/ForgotPassword' render={props => <ForgotPassword {...props} />} />
            <ToastContainer           
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />
            {/* Same as */}
            

            {/* <Route path='/admin/home/*' Component={NotFound} /> */}
            {/* <Redirect to='/' /> */}
          </>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
