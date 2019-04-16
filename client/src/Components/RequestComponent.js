import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'
import Select from 'react-select';

class RequestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // categoryData: [],
      // componentData: [],
      issue: '',      
    }
    this.Auth = new AuthService();
    this.changeValue3 = this.changeValue3.bind(this)
  }


  componentDidMount() {
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
    e.preventDefault();
    const data = {
      userId: this.props.user.id,
      categoryId: parseInt(this.state.categoryId),
      componentId: parseInt(this.state.componentId),
      componentName: this.state.componentName.label,
      issue: this.state.issue,
    }

    axios.post(`${process.env.REACT_APP_SERVER}/api/requestComponents`, data)
      .then((response) => {
        toast.success('🦄 Your request has been sent to Admin!');
         this.setState({categoryType: '', componentName: '', issue: ''}) 
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  changeValue3(e) {
    this.setState({ issue: e.target.value })
  }

  handleChange = (selectedOption) => {
     this.setState({ categoryId: selectedOption.value, categoryType: selectedOption, componentName: '' });
 
    axios.get(`${process.env.REACT_APP_SERVER}/api/components/getFilteredComponents/` + selectedOption.value).then((response) => {
      this.setState({ componentData: response.data.data })
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleChange2 = (selectedOption) => {
    this.setState({ componentId: selectedOption.value, componentName: selectedOption });
  }

  render() {
    return (
      <>
       <div className="wrapper" >
        <form className="login" style={{ height: "-webkit-fill-available" }} onSubmit={(e) => { this.handleFormSubmit(e) }}>
          Select Category<br />

          <Select
            options={this.state.categoryData && this.state.categoryData.map(e => ({
              label: e.categoryType,
              value: e.id
            }))}
            value={this.state.categoryType}
            onChange={(v)=>this.handleChange(v)}
          />

          <br /><br />

          Select Component <br />
          <Select
            options={this.state.componentData && this.state.componentData.map(e => ({
              label: e.componentName,
              value: e.id
            }))}
            value={this.state.componentName}
            onChange={(e)=>this.handleChange2(e)}
          />
          <br /><br />
          Issue <br />
          <textarea
            placeholder="Description goes here..."
            name="issue"
            onChange={(e) => { this.changeValue3(e) }}
          />
          <br />
          <Button type="submit" color="primary">Request Send</Button>&nbsp;         
          <Button onClick={() => { this.props.history.replace('/user/home') }} color="primary">Home</Button>
        </form>   
        </div>    
      </>

    )
  }
}
export default RequestComponent;