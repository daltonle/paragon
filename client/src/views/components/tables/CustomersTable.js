import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

import { getCustomers } from '../../../state/ducks/customers/actions'

import 'react-table/react-table.css'

class CustomersTable extends Component {
  componentDidMount = () => {
    this.props.getCustomers()
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
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "Phone",
        accessor: "phone",
        width: 140
      },
      {
        Header: "Credit line",
        accessor: "creditLine"
      },
      {
        Header: "Balance",
        accessor: "balance",
        width: 100
      },
      {
        Header: "Member",
        accessor: "isMember",
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
            <option value="true">Is a member</option>
            <option value="false">Not a member</option>
          </select>
      },
      {
        Header: "Join date",
        accessor: "joinDate",
        width: 120
      },
      {
        Header: "Interests",
        accessor: "interests"
      }
    ]

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={12}
          className="-striped -highlight"
          showPaginationTop
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
  data: state.customers.data
})

const mapDispatchToProps = {
  getCustomers
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTable)
