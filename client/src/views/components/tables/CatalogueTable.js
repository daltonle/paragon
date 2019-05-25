import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import ReactTable from 'react-table'
import Modal from 'react-bootstrap/Modal'
import { ButtonNormalDanger, GhostButton } from '../buttons/Buttons'
import { actionColumn } from './ActionColumn'

import { getModels } from '../../../state/ducks/models/actions'
import { getSuppliers } from '../../../state/ducks/suppliers/actions'
import { getCatalogues, deleteCatalogue } from '../../../state/ducks/catalogues/actions'

import 'react-table/react-table.css'

class ModelTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirm: false,
      deletedCatalogue: {}
    }
  }

  componentDidMount = () => {
    this.props.getModels()
    this.props.getSuppliers()
    this.props.getCatalogues()
  }

  handleShowDeleteConfirm = (row) => {
    this.setState({ 
      showDeleteConfirm: true, 
      deletedCatalogue: {
        id: row.id
      }
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false, deletedCatalogue: {} })
  }

  handleDelete = () => {
    this.props.deleteCatalogue(this.state.deletedCatalogue.id)
    this.handleCloseDeleteConfirm()
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        Header: "Supplier ID",
        accessor: "supplier_id",
        width: 100
      },
      {
        Header: "Supplier name",
        id: "supplier_name",
        Cell: (props) => {
          // if (this.props.suppliers && this.props.suppliers.length !== 0) {
          //   const supplier = this.props.suppliers[this.props.suppliers.findIndex(s => s.id === props.original.supplier_id)]
          //   if (supplier)
          //     return <span>{supplier.name}</span>
          // }
          // return <span>Not found</span>
          return <span></span>
        },
        filterMethod: (filter, row) => {
          if (filter.value === "") {
            return true
          }
          else {
            const supplier = this.props.suppliers[this.props.suppliers.findIndex(s => s.id === row.supplier_id)]
            if (!supplier)
              return false
            else return supplier.name.includes(filter.value)
          }
        },
        Filter: ({ filter, onChange }) =>
          <input
            type="text"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          />,
        aggregate: (vals, rows) => {
          if (this.props.suppliers && this.props.suppliers.length !== 0) {
            const supplier = this.props.suppliers[this.props.suppliers.findIndex(s => s.id === rows[0].supplier_id)]
            if (supplier)
              return supplier.name
          }
          return "Not found"
        },
        Aggregated: row => <span>{row.value}</span>
      },
      {
        Header: "Model ID",
        accessor: "pModel_id",
        width: 100
      },
      {
        Header: "Model name",
        id: "model_name",
        Cell: (props) => {
          if (this.props.models && this.props.models.length !== 0) {
            const model = this.props.models[this.props.models.findIndex(s => s.id === props.original.pModel_id)]
            if (model)
              return <span>{model.name}</span>
          }
          return <span>Not found</span>
        },
        filterMethod: (filter, row) => {
          if (filter.value === "") {
            return true
          }
          else {
            const model = this.props.models[this.props.models.findIndex(s => s.id === row.pModel_id)]
            if (!model)
              return false
            else return model.name.includes(filter.value)
          }
        },
        Filter: ({ filter, onChange }) =>
          <input
            type="text"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          />,
        aggregate: (vals, rows) => {
          return rows.map(row => {
            if (this.props.models && this.props.models.length !== 0) {
              const model = this.props.models[this.props.models.findIndex(s => s.id === row.pModel_id)]
              if (model)
                return model.name
            }
            return "Not found"
          }).join(", ")
        },
        Aggregated: row => <span>{row.value}</span>
      },
      {
        Header: "Price",
        id: "price",
        accessor: "price",
        width: 120,
        Cell: ({ value }) => <span>${value}</span>,
        aggregate: (vals) => _.round(_.mean(vals.map(v => parseFloat(v)))),
        Aggregated: row => <span>${row.value} (avg)</span>,
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
          pivotBy={["supplier_id"]}
        />
        <Modal show={this.state.showDeleteConfirm} onHide={this.handleCloseDeleteConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>Deleting catalogue item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this catalogue item?
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
  data: state.catalogues.data,
  models: state.models.data,
  suppliers: state.suppliers.data
})

const mapDispatchToProps = {
  getModels,
  getSuppliers,
  getCatalogues,
  deleteCatalogue
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelTable)
