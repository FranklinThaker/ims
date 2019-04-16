import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import ReactTable from "react-table";


class ViewDetailedIncident extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null
    }

    this.makeData = this.makeData.bind(this)
    this.Auth = new AuthService();
  }

  makeData(rowId) {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidentUpdates/details/` + rowId, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({
        data: response.data.data
      })
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentWillMount() {
    this.makeData(this.props.id);
  }

  render() {
    console.log(this.state.data, 'In render viewdetailed')
    return (
      <>
        <ReactTable
          data={this.state.data}
          columns={[            
            {
              Header: "Info",
              columns: [
                {
                  Header: "Issue Title",
                  Cell: row => <span className='number'>{row.original.IncidentDetails.incidentName}</span>
                },
                {
                  Header: "Issue Details",
                  Cell: row => <span className='number'>{row.original.IncidentDetails.incident}</span>
                },
                {
                  Header: "Issue Updates",
                  Cell: row => <span className='number'>{row.original.updates}</span>
                },
                {
                  Header: "Issue Status",
                  Cell: row => <span className='number'>{row.original.IncidentDetails.status}</span>
                },
                {
                  Header: "Updated By Last",
                  Cell: row => <span className='number'>{row.original.UserDetails.firstName && row.original.UserDetails.firstName}</span>
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

      </>

    )
  }
}
export default ViewDetailedIncident;