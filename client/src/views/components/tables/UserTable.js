import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-bootstrap/Modal'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getUsers, deleteUser } from '../../../state/ducks/users/actions'
import { getLocations } from '../../../state/ducks/locations/actions'

import 'react-table/react-table.css'

class UserTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedUser: {}
    }
  }

  componentDidMount = () => {
    this.props.getUsers()
    this.props.getLocations()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedUser: row
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedUser: {} })
  }

  handleDelete = () => {
    this.props.deleteUser(this.state.deletedUser.id)
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
        Header: "First name",
        accessor: "first_name",
        width: 80
      },
      {
        Header: "Last name",
        accessor: "last_name",
        width: 80
      },
      {
        Header: "Username",
        accessor: "username",
        width: 100
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Address",
        accessor: "profile.address"
      },
      {
        Header: "Phone",
        accessor: "profile.phoneNum",
        width: 100
      },
      {
        Header: "Location",
        accessor: "profile.location",
        width: 100,
        Cell: ({ value }) => {
          if (this.props.locations && this.props.locations.length !== 0)
            return <span>{this.props.locations[this.props.locations.findIndex(l => l.id === value)].city}</span>
          return <span>Not found</span>
        }
      },
      {
        Header: "Role",
        accessor: "profile.group",
        width: 120,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true
          }
          else if (filter.value === "Admin") {
            return row[filter.id] === "Admin"
          }
          else if (filter.value === "Staff") {
            return row[filter.id] === "Staff"
          }
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show all</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
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
            <Modal.Title>Deleting user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this user?<br/>
            <strong>{this.state.deletedUser.first_name} {this.state.deletedUser.last_name} - {this.state.deletedUser.email}</strong>
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
  data: state.users.data,
  locations: state.locations.data
})

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  getLocations
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)