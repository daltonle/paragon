import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Appbar } from '../../components/appbar/Appbar'
import CustomersTable from '../../components/tables/CustomersTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import CustomerForm from './CustomerForm'
import { addCustomer, updateCustomer } from '../../../state/ducks/customers/actions'

import styles from './CustomersPage.module.scss'

class CustomersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedCustomer: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  startUpdating = (customer) => {
    this.setState({
      updating: true,
      updatedCustomer: customer
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <CustomerForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{ 
            name: '',
            email: '',
            address: '',
            phone: '',
            creditLine: '',
            hasCreditLine: false,
            isMember: false,
            subjectInterests: [],
            modelTypeInterests: []
          }}
          onSubmit={this.props.addCustomer}
        />
      )
    else if (this.state.updating) {
      const { id, name, email, address, phone, hasCreditLine, creditLine, subject, type, isMember } = this.state.updatedCustomer
      return (
        <CustomerForm
          onCancel={() => this.setState({ updating: false, updatedCustomer: {} })}
          onFinish={() => this.setState({ updating: false, updatedCustomer: {} })}
          action="Edit"
          initial={{
            id,
            name,
            email,
            address,
            phone,
            hasCreditLine,
            creditLine,
            isMember,
            subjectInterests: subject.map(s => ({ value: s.name, label: s.name })),
            modelTypeInterests: type.map(t => ({ value: t.name, label: t.name }))
          }}
          onSubmit={this.props.updateCustomer}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Customers</h1>
          <ButtonNormal name="Add record" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <CustomersTable onStartUpdate={this.startUpdating} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="customers" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  addCustomer,
  updateCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage)