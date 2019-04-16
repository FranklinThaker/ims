import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import ViewDetailedIncident from './ViewDetailedIncident';


class ViewIssueStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {      
      id: null,
      modalView: false
    }
    
    this.makeData = this.makeData.bind(this)
    this.Auth = new AuthService();
  }  

  toggleViewDetails(rowId) {
    this.setState(prevState => ({
      modalView: !prevState.modalView,
      id: rowId,  
    }));
  }

  makeData() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/getIncidentById/` + this.props.user.id, {
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
    this.makeData();
  }


  handleDelete(rowId) {
    const header = this.Auth.getToken();
    axios.delete(`${process.env.REACT_APP_SERVER}/api/incidents/` + rowId, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      this.makeData();
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  renderViewDetailedIncidents() {
    return (
      <Modal isOpen={this.state.modalView} toggle={this.toggleViewDetails} className={this.props.className} size="lg">
        <ModalHeader toggle={(e)=>this.toggleViewDetails(e)}>View Incident Updates</ModalHeader>
        <ModalBody>
          <ViewDetailedIncident id={this.state.id} {...this.props} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e)=>this.toggleViewDetails(e)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    return (
      <>        
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Issue Details",
              columns: [
                {
                  Header: "Issue ID",
                  accessor: "id"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Issue Title",
                  accessor: "incidentName"
                },
                {
                  Header: "Issue Details",
                  accessor: "incident"
                },
                {
                  Header: "Issue Updates",
                  accessor: "updates"
                },
                {
                  Header: "Issue Status",
                  accessor: "status"
                },
                {
                  Header: "Issue Resolved By",
                  Cell: row => <span className='number'>{row.original.ResolvedBy && row.original.ResolvedBy.username }</span>
                },
                {
                  Header: '',
                  Cell: row => (
                    <>
                      {<Button color='danger' onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i></Button>}
                      {<Button color='primary' onClick={(e) => { this.toggleViewDetails(row.original.id) }}>View Details</Button>}

                    </>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
         {this.renderViewDetailedIncidents()}
        <br />

      </>

    )
  }
}
export default ViewIssueStatus;