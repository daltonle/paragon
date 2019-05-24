import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-bootstrap/Modal'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getLocations, deleteLocation } from '../../../state/ducks/locations/actions'

import 'react-table/react-table.css'

class LocationTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedLocation: {}
    }
  }

  componentDidMount = () => {
    this.props.getLocations()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedLocation: {
        id: row.id
      }
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedLocation: {} })
  }

  handleDelete = () => {
    this.props.deleteLocation(this.state.deletedLocation.id)
    this.handleCloseDeleteConfirm()
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 64
      },
      {
        Header: "Street address",
        accessor: "street",
        width: 700
      },
      {
        Header: "City",
        accessor: "city",
        width: 150
      },
      {
        Header: "State",
        accessor: "state",
        width: 80
      },
      {
        Header: "Postcode",
        accessor: "postcode",
        width: 100
      },
      {
        Header: "Actions",
        Cell: (props) => {
          return actionColumn(props, this.handleShowDeleteConfirm, this.props.onStartUpdate)
        },
        filterable: false,
        width: 172
      }
    ]

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          showPageSizeOptions={false}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]).includes(filter.value)}
        />
        <Modal show={this.state.showDeleteConfirm} onHide={this.handleCloseDeleteConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>Deleting model record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this model record?
          </Modal.Body>
          <Modal.Footer>
            <GhostButton name="Cancel" onClick={this.handleCloseDeleteConfirm} />
            <ButtonNormalDanger name="Delete" onClick={this.handleDelete} />
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.locations.data
})

const mapDispatchToProps = {
  getLocations,
  deleteLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationTable)
