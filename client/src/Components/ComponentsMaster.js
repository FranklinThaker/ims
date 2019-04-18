import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import ComponentCRUD from './ComponentCRUD';


class ComponentsMaster extends Component {
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

  toggleEdit(rowId) {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit,
      id: rowId
    }));
  }

  makeData() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/components/`, {
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

  renderEditComponentModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Edit Component</ModalHeader>
        <ModalBody>
          <ComponentCRUD id={this.state.id} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.toggleEdit(e) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderAddComponentModal() {
    return (
      <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
        <ModalHeader toggle={this.toggleAdd}>Add New Component</ModalHeader>
        <ModalBody>
          <ComponentCRUD makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    console.log(this.state.data)
    return (
      <>
        <Button type="submit" color="primary" onClick={this.toggleAdd}>Add New Component</Button>&nbsp;
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Component Details",
              columns: [
                {
                  Header: "Component ID",
                  accessor: "id"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Category Id",
                  accessor: "categoryId"
                },
                {
                  Header: "Category Type",
                  Cell: row => <span className='number'>{row.original.CategoryDetails.categoryType && row.original.CategoryDetails.categoryType }</span>
                },
                {
                  Header: "Component Name",
                  accessor: "componentName"
                },
                {
                  Header: "Component Name",
                  accessor: "serialNo"
                },
                {
                  Header: "status",
                  id: "status",
                  accessor: d => String(d.status)
                },
                {
                  Header: "Warranty Date",
                  accessor: "warrantyDate"
                },
                {
                  Header: '',
                  Cell: row => (
                    <>
                      {<><Button color='primary' onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i></Button>&nbsp;</>}
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
        {this.renderEditComponentModal()}
        {this.renderAddComponentModal()}
      </>

    )
  }
}
export default ComponentsMaster;