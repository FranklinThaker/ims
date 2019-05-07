import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import IncidentCRUD from './IncidentCRUD';
import Simplert from 'react-simplert'

class IncidentsMaster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false,
      modalEdit: false,
      id: null,
      showSimplert: false
    }
    this.toggleAdd = this.toggleAdd.bind(this);
    this.makeData = this.makeData.bind(this)
    this.Auth = new AuthService();
  }

  toggleAdd() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }));
  }

  toggleEdit(rowId) {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit,
      id: rowId
    }));
  }

  makeData() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/`, {
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
      if (this.state.showSimplert === false) this.setState({ showSimplert: !this.state.showSimplert });
      this.makeData();
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  renderEditIncidentModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className} >
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Edit Incident</ModalHeader>
        <ModalBody>
          <IncidentCRUD id={this.state.id} makeData={this.makeData} {...this.props} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.toggleEdit(e) }}>Cancel</Button>
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
              Header: "Incident Details",
              columns: [
                {
                  Header: "Incident ID",
                  accessor: "id"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Incident By",
                  Cell: row => <span className='number'>{row.original.IncidentBy.username}</span>
                },
                {
                  Header: "Incident Title",
                  accessor: "incidentName"
                },
                {
                  Header: "Incident Details",
                  accessor: "incident"
                },
                {
                  Header: "Updates",
                  accessor: "updates"
                },
                {
                  Header: "Resolved By",
                  Cell: row => <span className='number'>{row.original.ResolvedBy && row.original.ResolvedBy.username }</span>
                },
                {
                  Header: "Status",
                  accessor: "status"
                },
                {
                  Header: '',
                  Cell: row => (
                    <>
                      {<><Button color='primary' onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className="fa fa-pencil-square-o"></i></Button>&nbsp;</>}
                      {<Button color='danger' onClick={(e) => { this.handleDelete(row.original.id) }}><i className="fa fa-times"></i></Button>}
                    </>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        {this.renderEditIncidentModal()}
        <Simplert type={"error"} title={"Your data has been deleted!"} showSimplert={this.state.showSimplert} onClose={() => this.setState({ showSimplert: !this.state.showSimplert })} />

      </>

    )
  }
}
export default IncidentsMaster;