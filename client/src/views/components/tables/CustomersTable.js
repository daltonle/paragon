import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getCustomers, deleteCustomer } from '../../../state/ducks/customers/actions'

import 'react-table/react-table.css'

class CustomersTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedCustomer: {}
    }
  }

  componentDidMount = () => {
    this.props.getCustomers()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedCustomer: {
        id: row.id,
        name: row.name
      }
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedCustomer: {} })
  }

  handleDelete = () => {
    this.props.deleteCustomer(this.state.deletedCustomer.id)
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
        style: {'whiteSpace': 'unset'},
        width: 100,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 160
      },
      {
        Header: "Address",
        accessor: "address",
        style: {'whiteSpace': 'unset'}
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
        width: 90,
        Cell: ({ value }) => <span>${value}</span>,
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
        width: 100,
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
            <option value="year">Past year</option>
          </select>
      },
      {
        Header: "Subjects",
        accessor: "subject",
        style: {'whiteSpace': 'unset'},
        width: 100,
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
        style: {'whiteSpace': 'unset'},
        width: 100,
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
            <Modal.Title>Deleting customer record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this customer?<br/><br/><strong>{this.state.deletedCustomer.name}</strong>
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
  data: state.customers.data
})

const mapDispatchToProps = {
  getCustomers,
  deleteCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTable)
