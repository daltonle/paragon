import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getSales, deleteSale } from '../../../state/ducks/sales/actions'

import 'react-table/react-table.css'

class SalesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedSale: {}
    }
  }

  componentDidMount = () => {
    this.props.getSales()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedSale: {
        id: row.id
      }
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedSale: {} })
  }

  handleDelete = () => {
    this.props.deleteSale(this.state.deletedSale.id)
    this.handleCloseDeleteConfirm()
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        Header: "Date",
        accessor: "date",
        width: 160,
        Cell: ({ value }) => (
          <div>
            {moment(value).format("DD-MM-YYYY HH:mm:ss")}
          </div>
        )
      },
      {
        Header: "Cust. ID",
        accessor: "customerId",
        width: 80
      },
      {
        Header: "Value",
        accessor: "value",
        width: 100,
        Cell: ({ value }) => (
          <span>${value}</span>
        )
      },
      {
        Header: "Discount",
        accessor: "discount",
        width: 100,
        Cell: ({ value }) => (
          <span>{value}%</span>
        )
      },
      {
        Header: "Items",
        accessor: "items",
        Cell: ({ value }) => {
          const items = value.map((item, index) => (
            <p key={index}>
              {item.id}: {item.name} (quantity: {item.quantity})
            </p>
          ))
          return (
            <div>
              {items}
            </div>
          )
        }
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
            <Modal.Title>Deleting sale record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this sale record?
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
  data: state.sales.data
})

const mapDispatchToProps = {
  getSales,
  deleteSale
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable)
