import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Appbar } from '../../components/appbar/Appbar'
import SupplierTable from '../../components/tables/SupplierTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import SupplierForm from './SupplierForm'
import { addSupplier, updateSupplier } from '../../../state/ducks/suppliers/actions'

import styles from './SupplierPage.module.scss'

class SupplierPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedSupplier: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  startUpdating = (supplier) => {
    this.setState({
      updating: true,
      updatedSupplier: supplier
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <SupplierForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{
            name: '',
            address: '',
            creditLine: '',
            hasCreditLine: false,
            balance: '',
            deliveryNotes: '',
            contactPerson: ''
          }}
          onSubmit={this.props.addSupplier}
        />
      )
    else if (this.state.updating) {
      return (
        <SupplierForm
          onCancel={() => this.setState({ updating: false, updatedSupplier: {} })}
          onFinish={() => this.setState({ updating: false, updatedSupplier: {} })}
          action="Edit"
          initial={this.state.updatedSupplier}
          onSubmit={this.props.updateSupplier}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Suppliers</h1>
          <ButtonNormal name="Add supplier" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <SupplierTable onStartUpdate={this.startUpdating} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="suppliers" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  addSupplier,
  updateSupplier
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPage)