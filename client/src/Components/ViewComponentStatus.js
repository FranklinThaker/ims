import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class ViewComponentStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.Auth = new AuthService();
    this.makeData = this.makeData.bind(this);
  }

  makeData() {
    const id = this.props.user.id;
    const data = {
      userId: id,
    }
    axios.post(`${process.env.REACT_APP_SERVER}/api/requestComponents/requestComponentByUser`, data, {

    }).then((response) => {
      this.setState({
        data: response.data.data
      })
      console.log('Getting api data', this.state.data)
    })

      .catch(function (error) {
        console.log(error);
      })
  }
  componentWillMount() {
    this.makeData();
  }

  render() {

    return (
      <>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Component Details",
              columns: [
                {
                  Header: "Component Name",
                  accessor: "componentName"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "issue",
                  accessor: "issue"
                },
                {
                  Header: "Status",
                  // accessor: "status"
                  id: "status",
                  accessor: d => d.status
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          onFetchData={this.makeData} 
        />
        <br />
      </>
    )
  }
}
export default ViewComponentStatus;

