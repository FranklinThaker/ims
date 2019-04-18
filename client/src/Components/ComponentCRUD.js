import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap'
import Select from 'react-select';

let formdata = {    
    componentName: '',
    status: '', //available or not > boolean
    serialNo: '',
    warrantyDate: '',
  }

class ComponentCRUD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      formdata: { ...formdata },
      id: null,
      flag: false
    }
    this.ChangeUpdateValue = this.ChangeUpdateValue.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService();
  }

  handleChange = (selectedOption) => {
    this.setState({ categoryId: selectedOption.value, categoryType: selectedOption });
 }

  ChangeUpdateValue(e, currentUser, field2) {
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }

  getData(rowId) {
    axios.get(`${process.env.REACT_APP_SERVER}/api/components/getComponentsById/` + rowId)
      .then(response => {
          console.log(response, 'kflsdjf')
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
    if (this.props.id !== undefined){
      this.getData(this.props.id)
      this.setState({flag: true})
    }

    const header = this.Auth.getToken()
      axios.get(`${process.env.REACT_APP_SERVER}/api/categories/getAllCategories`, {
        headers: {
          'Authorization': header,
        }
      }).then((response) => {
        this.setState({ categoryData: response.data.data })
      })
        .catch(function (error) {
          console.log(error);
        })
  }

  handleFormSubmit(e) {
    if (this.state.flag) { ///for edit in the data
      e.preventDefault();
      const fpt = {
        categoryId: this.state.categoryId,
        componentName: this.state.formdata.componentName,
        status: this.state.formdata.status,
        serialNo: this.state.formdata.serialNo,
        warrantyDate: this.state.formdata.warrantyDate
      }
      const header = this.Auth.getToken();
      axios.put(`${process.env.REACT_APP_SERVER}/api/components/` + this.props.id, fpt, {
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
    else {
      e.preventDefault();
      const data = {
        categoryId: this.state.categoryId,
        componentName: this.state.formdata.componentName,
        status: this.state.formdata.status,
        serialNo: this.state.formdata.serialNo,
        warrantyDate: this.state.formdata.warrantyDate
      }
      const header = this.Auth.getToken();
      axios.post(`${process.env.REACT_APP_SERVER}/api/components`, data, {
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
        <form className="login" onSubmit={(e) => { this.handleFormSubmit(e) }}>        
        
        {/* <label>Category Id</label> 
        <input type="text" value={this.state.formdata.categoryId} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'categoryId')} required /> */}
       
       Select Category

          <Select
            options={this.state.categoryData && this.state.categoryData.map(e => ({
              label: e.categoryType,
              value: e.id
            }))}
            value={this.state.categoryType}
            onChange={(v)=>this.handleChange(v)}
          />

        <label>Component Name</label> 
        <input type="text" value={this.state.formdata.componentName} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'componentName')} required />
        
        
        <table>
            <th>Status</th>
            <tr>
              <td>
                Available <input type="radio" value='true' name="status" checked={this.state.formdata.status === 'true'}
                  onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'status')} />
              </td>&nbsp;&nbsp;&nbsp;
              <td>
                Not Available <input type="radio" value='false' name="status" checked={this.state.formdata.status === 'false'}
                  onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'status')} />
              </td>
            </tr>
          </table>
        
        
        <label>Serial No</label> 
        <input type="text" value={this.state.formdata.serialNo} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'serialNo')} required />
        
        
        warrantyDate
        <input type="date" value={this.state.formdata.warrantyDate} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'warrantyDate')} required />
        
        <Button type="submit" color="primary">Update</Button>&nbsp;
        
        </form>

        <Alert color="primary" isOpen={this.state.collapse}>
          Your DATA has been updated!
        </Alert>
      </>
    )
  }
}
export default ComponentCRUD;