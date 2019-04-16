import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

let formdata = {
  incidentName: '',
  incident: '',
}

class RaiseIssue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formdata: { ...formdata },
      flag: false,
      id: null
    }
    this.ChangeUpdateValue = this.ChangeUpdateValue.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService();
  }

  ChangeUpdateValue(e, currentUser, field2) {
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }

  getData(rowId) {
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/getSingleIncidentById/` + rowId)
      .then(response => {
        console.log(response.data.data, 'data response in edit/add model')
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
    if(this.props.id)
      this.getData(this.props.id)
  }

  handleFormSubmit(e) {
    if (this.state.flag) { ///for edit in the data
      e.preventDefault();
      const fpt = {
        incidentName: this.state.formdata.incidentName,
        incident: this.state.formdata.incident,
      }
      const header = this.Auth.getToken();
      axios.put(`${process.env.REACT_APP_SERVER}/api/incidents/` + this.props.id, fpt, {
        headers: {
          'Authorization': header
        },
      }).then((response) => {
        toast.success('🦄 Your request has been updated to Admin!');
        
      })
        .catch(function (error) {
          console.log(error);
        })
    }

    else {
      e.preventDefault();
      const data = {
        incidentBy: this.props.user.id,
        incidentName: this.state.formdata.incidentName,
        incident: this.state.formdata.incident,

      }
      const header = this.Auth.getToken();
      axios.post(`${process.env.REACT_APP_SERVER}/api/incidents`, data, {
        headers: {
          'Authorization': header
        },
      }).then((response) => {
        toast.success('🦄 Your request has been sent to Admin!');
        // setTimeout(() => {
        //   this.setState({
        //     collapse: false
        //   });
        // }, 1000)
        
      })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
  render() {
    return (
      <>
      <div className="wrapper" >     
        <form className="login" style={{ height: "-webkit-fill-available" }} onSubmit={(e) => { this.handleFormSubmit(e) }}>
        Incident Title<input type="text" value={this.state.formdata.incidentName} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'incidentName')} required />
        Incident Details   <input type="text" value={this.state.formdata.incident} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'incident')} required />
                

          <Button type="submit" color="primary">Update</Button>&nbsp;

        </form>
        </div>
        
      </>
    )
  }
}
export default RaiseIssue;