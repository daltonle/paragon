import React, { Component } from 'react'
import { Appbar } from '../../components/appbar/Appbar'
import SalesTable from '../../components/tables/SalesTable'

import styles from './SalesPage.module.scss'

export default class SalesPage extends Component {
  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="sales" />
        </div>
        <div className={styles.content}>
          <SalesTable />
        </div>
      </div>
    )
  }
}
