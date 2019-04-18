import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import AssignComponent from './AssignComponent';


class ManageComponents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false,
      modalEdit: false,
      id: null
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

  toggleAssign(rowId) {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit,
      id: rowId
    }));
  }

  makeData() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/components/getUnAssignedComponents/`, {
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
    axios.delete(`${process.env.REACT_APP_SERVER}/api/components/` + rowId, {
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

    renderAssignComponentModel() {
      return (
        <Modal isOpen={this.state.modalEdit} toggle={this.toggleAssign} className={this.props.className}>
          <ModalHeader toggle={(e) => { this.toggleAssign(e) }}>Assign Component</ModalHeader>
          <ModalBody>
            <AssignComponent id={this.state.id} makeData={this.makeData} userId={this.props.user.id}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={(e) => { this.toggleAssign(e) }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )
    }

  //   renderAddComponentModal() {
  //     return (
  //       <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
  //         <ModalHeader toggle={this.toggleAdd}>Add New Component</ModalHeader>
  //         <ModalBody>
  //           <ComponentCRUD makeData={this.makeData} />
  //         </ModalBody>
  //         <ModalFooter>
  //           <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
  //         </ModalFooter>
  //       </Modal>
  //     )
  //   }

  render() {
    return (
      <>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Info",
              columns: [
                {
                  Header: "Category Type",                  
                  Cell: row => <span className='number'>{row.original.CategoryDetails.categoryType}</span>
                },
                {
                  Header: "Component Name",
                  accessor: "componentName"
                },
                {
                  Header: "Serial No",
                  accessor: "serialNo"
                },
                {
                  Header: "Available or Not",
                  id: "status",
                  accessor: d => String(d.status)
                },
                {
                  Header: "Assigned By",                  
                  Cell: row => <span className='number'>{row && row.original && row.original.UserAssignedBy && row.original.UserAssignedBy.firstName}</span>
                },
                {
                  Header: "Assigned To",                  
                  Cell: row => <span className='number'>{row && row.original && row.original.UserAssignedTo && row.original.UserAssignedTo.firstName}</span>
                },
                {
                  Header: "Warranty Date",
                  accessor: "warrantyDate"
                },
                {
                  Header: 'Assign Component Here',
                  Cell: row => (
                    <>
                      {<><Button color='primary' onClick={(e) => { this.toggleAssign(row.original.id) }} ><i className='fas'>&#xf005;</i></Button>&nbsp;</>}
                      {<Button color='danger' onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i></Button>}
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
        {this.renderAssignComponentModel()}
        {/* {this.renderAddComponentModal()} */}
      </>

    )
  }
}
export default ManageComponents;