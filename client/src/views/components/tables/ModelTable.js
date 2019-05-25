import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-bootstrap/Modal'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getModels, deleteModel } from '../../../state/ducks/models/actions'
import { getLocations } from '../../../state/ducks/locations/actions'

import 'react-table/react-table.css'

class ModelTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedModel: {}
    }
  }

  componentDidMount = () => {
    this.props.getModels()
    this.props.getLocations()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedModel: {
        id: row.id
      }
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedModel: {} })
  }

  handleDelete = () => {
    this.props.deleteModel(this.state.deletedModel.id)
    this.handleCloseDeleteConfirm()
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 40
      },
      {
        Header: "Name",
        accessor: "name",
        width: 150
      },
      {
        Header: "Type",
        accessor: "type",
        width: 80
      },
      {
        Header: "Subject",
        accessor: "subject",
        width: 80
      },
      {
        Header: "In stock",
        accessor: "inStock",
        width: 72
      },
      {
        Header: "Price",
        accessor: "price",
        width: 80,
        Cell: ({ value }) => (
          <span>$ {value}</span>
        )
      },
      {
        Header: "Date acquired",
        accessor: "dateAcquired",
        width: 120
      },
      {
        Header: "Location",
        accessor: "location",
        width: 100,
        Cell: ({ value }) => {
          if (this.props.locations && this.props.locations.length !== 0)
            return <span>{this.props.locations[this.props.locations.findIndex(l => l.id === value)].city}</span>
          return <span>Not found</span>
        }
      },
      {
        Header: "Description",
        accessor: "description",  
      },
      {
        Header: "Available",
        accessor: "availability",
        width: 120,
        Cell: ({ value }) => (
          <div style={{ textAlign: 'center', color: value ? "#02A27F" : "#FF595E" }} >
            {value ? "Yes" : "No"}
          </div>
        ),
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true
          }
          else if (filter.value === "true") {
            return row[filter.id] === true
          }
          else if (filter.value === "false") {
            return row[filter.id] === false
          }
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show all</option>
            <option value="true">Available</option>
            <option value="false">Not available</option>
          </select>
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
  data: state.models.data,
  locations: state.locations.data
})

const mapDispatchToProps = {
  getModels,
  getLocations,
  deleteModel
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelTable)
