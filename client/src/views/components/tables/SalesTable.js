import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { actionColumn } from './ActionColumn'

import { getSales } from '../../../state/ducks/sales/actions'

import 'react-table/react-table.css'

class SalesTable extends Component {
  componentDidMount = () => {
    this.props.getSales()
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        Header: "Date",
        accessor: "date",
        width:120
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
          return actionColumn(props)
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.sales.data
})

const mapDispatchToProps = {
  getSales
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable)
