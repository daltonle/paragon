import React, { Component } from 'react'
import { Appbar } from '../../components/appbar/Appbar'
import CustomersTable from '../../components/tables/CustomersTable'
import { ButtonNormal } from '../../components/buttons/Buttons'

import styles from './CustomersPage.module.scss'

export default class CustomersPage extends Component {
  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="customers" />
        </div>
        <div className={styles.header}>
          <h1>Customers</h1>
          <ButtonNormal name="Add record" className={styles.button} />
        </div>
        <div className={styles.content}>
          <CustomersTable />
        </div>
      </div>
    )
  }
}
