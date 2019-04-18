
import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import Simplert from 'react-simplert'
import Select from 'react-select';

let formdata = {
  incidentId: '',
  incidentName: '',
  incident: '',
  updates: '',
  resolvedBy: '',
  status: '',
}

class IncidentCRUD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSimplert: false,
      formdata: { ...formdata },
      id: null,
      userArray: []
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
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/getResolvedByName`)
      .then(response => {
        this.setState({
          userArray: response.data.data,

        });
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/getSingleIncidentById/` + rowId)
      .then(response => {
        this.setState({
          formdata: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  }

  componentWillMount() {
    this.getData(this.props.id)
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const fpt = {
      updates: this.state.formdata.updates,
      status: this.state.formdata.status,
      resolvedBy: this.state.selectedOption.value,
      updateBy: this.props.user.id
    }
    const header = this.Auth.getToken();
    axios.put(`${process.env.REACT_APP_SERVER}/api/incidents/` + this.props.id, fpt, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      if (this.state.showSimplert === false) this.setState({ showSimplert: !this.state.showSimplert });

      this.props.makeData()
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    console.log(this.state.userArray, "in render incidentcrud")
    return (
      <>
        <form className="login" onSubmit={(e) => { this.handleFormSubmit(e) }}>
          
            <label>Incident Name</label>          
            <input type="text" value="" value={this.state.formdata.incidentName} disabled />

          
            <label>Incident Details</label>           
            <input type="text" value={this.state.formdata.incident} disabled />

          
            <label>Updates</label>          
            <input type="text" value={this.state.formdata.updates} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'updates')} required />

          
            <label>Status</label>          
            <input type="text" value={this.state.formdata.status} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'status')} required />

          Select Resolved By User <br />
          <Select
            options={this.state.userArray.map(e => ({
              label: e.username,
              value: e.id
            }))}
            value={this.selectedOption}
            onChange={this.handleChange} />
            <br/>

          <Button type="submit" color="primary">Update</Button>&nbsp;

        </form>

        <Simplert type={"success"} title={"Data Updated!"} showSimplert={this.state.showSimplert} onClose={() => this.setState({ showSimplert: !this.state.showSimplert })} />

      </>
    )
  }
}
export default IncidentCRUD;