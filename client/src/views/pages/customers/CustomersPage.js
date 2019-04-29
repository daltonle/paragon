import React, { Component } from 'react'
import { Appbar } from '../../components/appbar/Appbar'
import CustomersTable from '../../components/tables/CustomersTable'
import { ButtonNormal } from '../../components/buttons/Buttons'

import styles from './CustomersPage.module.scss'

export default class CustomersPage extends Component {
  componentDidMount = () => {
    if (sessionStorage.getItem("loggedIn") !== "true")
      this.props.history.push('/login')
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="customers" history={this.props.history} />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Customers</h1>
            <ButtonNormal name="Add record" className={styles.button} />
          </div>
          <CustomersTable />
        </div>
      </div>
    )
  }
}
