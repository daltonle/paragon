import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import moment from 'moment'
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
        accessor: "name",
        style: {'white-space': 'unset'},
        width: 120,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 160
      },
      {
        Header: "Address",
        accessor: "address",
        style: {'white-space': 'unset'}
      },
      {
        Header: "Phone",
        accessor: "phone",
        width: 100
      },
      {
        Header: "Credit line",
        accessor: "creditLine",
        width: 100,
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
        accessor: "joinDate",
        width: 120,
        Cell: ({ value }) => {
          if (value)
            return <span>{moment(value).format("DD-MM-YYYY")}</span>
          else return <span>N/A</span>
        },
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
            <option value="year">This year</option>
          </select>
      },
      {
        Header: "Subjects",
        accessor: "subject",
        style: {'white-space': 'unset'},
        width: 120,
        Cell: ({ value }) => {
          let output = ""
          value.forEach((s, index) => {
            if (index > 0)
              output += ", "
            output += s.name
          })
          return <span>{output === "" ? "None" : output}</span>
        }
      },
      {
        Header: "Types",
        accessor: "type",
        style: {'white-space': 'unset'},
        width: 120,
        Cell: ({ value }) => {
          let output = ""
          value.forEach((t, index) => {
            if (index > 0)
              output += ", "
            output += t.name
          })
          return <span>{output === "" ? "None" : output}</span>
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
