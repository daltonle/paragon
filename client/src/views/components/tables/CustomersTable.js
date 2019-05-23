import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { actionColumn } from './ActionColumn'

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
        width: 40
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Address",
        accessor: "address",
        width: 220
      },
      {
        Header: "Phone",
        accessor: "phone",
        width: 100
      },
      {
        Header: "Credit line",
        Cell: props => {
          if (props.original.hasCreditLine)
            return <span>{props.original.creditLine}</span>
          else return <span>N/A</span>
        }
      },
      {
        Header: "Balance",
        accessor: "balance",
        width: 80,
        Cell: ({ value }) => <span>${value}</span>
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
        width: 120,
        Cell: props => {
          if (props.original.isMember)
            return <span>{props.original.joinDate}</span>
          else return <span>N/A</span>
        }
      },
      {
        Header: "Subjects",
        accessor: "subject",
        Cell: ({ value }) => {
          let output = ""
          value.map((s, index) => {
            if (index > 0)
              output += ", "
            output += s.name
          })
          return <span>{output}</span>
        }
      },
      {
        Header: "Types",
        accessor: "type",
        Cell: ({ value }) => {
          let output = ""
          value.map((t, index) => {
            if (index > 0)
              output += ", "
            output += t.name
          })
          return <span>{output}</span>
        }
      },
      { ...actionColumn }
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
  data: state.customers.data
})

const mapDispatchToProps = {
  getCustomers
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTable)
