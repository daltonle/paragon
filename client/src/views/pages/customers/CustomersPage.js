import React, { Component } from 'react'
import { Appbar } from '../../components/appbar/Appbar'
import CustomersTable from '../../components/tables/CustomersTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import CustomerForm from './CustomerForm'

import styles from './CustomersPage.module.scss'

export default class CustomersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: true
    }
  }

  componentDidMount = () => {
    if (sessionStorage.getItem("loggedIn") !== "true")
      this.props.history.push('/login')
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <CustomerForm 
          onCancel={() => this.setState({ adding: false })}  
        />
      )
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Customers</h1>
          <ButtonNormal name="Add record" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <CustomersTable />
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
