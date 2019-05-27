import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import moment from 'moment'

import { getOrders } from '../../../state/ducks/stock-order/actions'
import { getSuppliers } from '../../../state/ducks/suppliers/actions'

import 'react-table/react-table.css'

class SalesTable extends Component {
  componentDidMount = () => {
    this.props.getOrders()
    this.props.getSuppliers()
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 80
      },
      {
        Header: "Time",
        accessor: "time",
        width: 160,
        Cell: ({ value }) => (
          <div>
            {moment(value).format("DD-MM-YYYY HH:mm:ss")}
          </div>
        ),
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true
          }
          else if (filter.value === "week") {
            return moment(row[filter.id]).isAfter(moment().subtract(1, 'w'))
          }
          else if (filter.value === "month") {
            return moment(row[filter.id]).isAfter(moment().subtract(1, 'M'))
          }
          else if (filter.value === "6month") {
            return moment(row[filter.id]).isAfter(moment().subtract(6, 'M'))
          }
          else if (filter.value === "year") {
            return moment(row[filter.id]).isAfter(moment().subtract(1, 'y'))
          }
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show all</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="6month">Last 6 months</option>
            <option value="year">Past year</option>
          </select>
      },
      {
        Header: "Value",
        accessor: "value",
        width: 100,
        Cell: ({ value }) => (
          <span>${value}</span>
        ),
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true
          }
          else if (filter.value === "0") {
            return row[filter.id] < 100
          }
          else if (filter.value === "1") {
            return row[filter.id] > 100 && row[filter.id] <= 500
          }
          else if (filter.value === "2") {
            return row[filter.id] > 500
          }
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show all</option>
            <option value="0">{`<$100`}</option>
            <option value="1">{`$101-500`}</option>
            <option value="2">{`>$500`}</option>
          </select>
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
        Header: "Supplier",
        accessor: "supplierId",
        Cell: ({ value }) => {
          if (this.props.suppliers && this.props.suppliers.length !== 0) {
            const supplier = this.props.suppliers[this.props.suppliers.findIndex(s => s.id === value)]
            if (supplier)
              return <span>{supplier.name}</span>
          }
          return <span>Not found</span>
        }
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
  data: state.orders.data,
  suppliers: state.suppliers.data
})

const mapDispatchToProps = {
  getOrders,
  getSuppliers
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable)
