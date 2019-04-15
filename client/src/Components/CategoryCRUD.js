import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap'

let formdata = {
  categoryType: ''
}

class CategoryCRUD extends Component {
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

  ChangeUpdateValue(e, currentUser, field2) {
    e.preventDefault();
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }

  getData(rowId) {
    axios.get(`${process.env.REACT_APP_SERVER}/api/categories/getCategoryById/` + rowId)
      .then(response => {
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
    if (this.props.id !== undefined)
      this.getData(this.props.id)
  }

  handleFormSubmit(e) {
    if (this.state.flag) { ///for edit in the data
      e.preventDefault();
      const fpt = {
        categoryType: this.state.formdata.categoryType
      }
      const header = this.Auth.getToken();
      axios.put(`${process.env.REACT_APP_SERVER}/api/categories/` + this.props.id, fpt, {
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
        categoryType: this.state.formdata.categoryType
      }
      const header = this.Auth.getToken();
      axios.post(`${process.env.REACT_APP_SERVER}/api/categories`, data, {
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
        <form className="frank" onSubmit={(e) => { this.handleFormSubmit(e) }}>
        <div className="question">
        <input type="text" value={this.state.formdata.categoryType} onChange={(e) => this.ChangeUpdateValue(e, 'formdata', 'categoryType')} required />
        <label>Category Type</label> 
        </div>
          <Button type="submit" color="primary">Update</Button>&nbsp;
        </form>

        <Alert color="primary" isOpen={this.state.collapse}>
          Your DATA has been updated!
        </Alert>
      </>
    )
  }
}
export default CategoryCRUD;