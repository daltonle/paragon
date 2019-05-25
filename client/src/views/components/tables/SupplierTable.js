import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-bootstrap/Modal'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getSuppliers, deleteSupplier } from '../../../state/ducks/suppliers/actions'

import 'react-table/react-table.css'

class SupplierTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedSupplier: {}
    }
  }

  componentDidMount = () => {
    this.props.getSuppliers()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedSupplier: {
        id: row.id,
        name: row.name
      }
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedSupplier: {} })
  }

  handleDelete = () => {
    this.props.deleteSupplier(this.state.deletedSupplier.id)
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
        width: 120
      },
      {
        Header: "Address",
        accessor: "address",
        width: 220,
        style: { whiteSpace: 'unset' }
      },
      {
        Header: "Credit line",
        accessor: "creditLine",
        width: 100,
        Cell: (props) => (
          <span>{props.original.hasCreditLine ? props.original.creditLine : ""}</span>
        )
      },
      {
        Header: "Balance",
        accessor: "balance",
        width: 90,
        Cell: ({ value }) => <span>${value}</span>,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true
          }
          else if (filter.value === "0") {
            return row[filter.id] < 500
          }
          else if (filter.value === "1") {
            return row[filter.id] > 500 && row[filter.id] <= 1000
          }
          else if (filter.value === "2") {
            return row[filter.id] > 1000
          }
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show all</option>
            <option value="0">{`<$500`}</option>
            <option value="1">{`$501-1000`}</option>
            <option value="2">{`>$1000`}</option>
          </select>
      },
      {
        Header: "Delivery notes",
        accessor: "deliveryNotes",
        style: { whiteSpace: 'unset' }
      },
      {
        Header: "Contact person", 
        accessor: "contactPerson",
        style: { whiteSpace: 'unset' }
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
            <Modal.Title>Deleting supplier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this supplier?<br/><strong>{this.state.deletedSupplier.name}</strong>
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
  data: state.suppliers.data
})

const mapDispatchToProps = {
  getSuppliers,
  deleteSupplier
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierTable)
