import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap'
import Select from 'react-select';

class AssignComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      id: null
    }
   
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService();
  }

  handleChange = (selectedOption) => {
    this.setState({ assignedTo: selectedOption.value });
 }
  
  
  componentDidMount() {    

    const header = this.Auth.getToken()
      axios.get(`${process.env.REACT_APP_SERVER}/api/users/fetchNames`, {
        headers: {
          'Authorization': header,
        }
      }).then((response) => {
        this.setState({ UserData: response.data.data })
      })
        .catch(function (error) {
          console.log(error);
        })
  }

  handleFormSubmit(e) {   
   
      e.preventDefault();
      const data = {
        assignedBy: this.props.userId,
        assignedTo: this.state.assignedTo
      }
      const header = this.Auth.getToken();
      axios.put(`${process.env.REACT_APP_SERVER}/api/components/AssignComponent/`+ this.props.id, data, {
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

  render() {
    return (
      <>
        <form className="login" onSubmit={(e) => { this.handleFormSubmit(e) }}>      
        
        
       Assign This Component To

          <Select
            options={this.state.UserData && this.state.UserData.map(e => ({
              label: e.firstName,
              value: e.id
            }))}
            value={this.state.firstName}
            onChange={(v)=>this.handleChange(v)}        />      
      
        
        <Button type="submit" color="primary">Update</Button>&nbsp;
        
        </form>

        <Alert color="primary" isOpen={this.state.collapse}>
         Component Has been assigned!
        </Alert>
      </>
    )
  }
}
export default AssignComponent;