import React, { Component } from 'react'
import { Appbar } from '../../components/appbar/Appbar'
import SalesTable from '../../components/tables/SalesTable'
import { ButtonNormal } from '../../components/buttons/Buttons'

import styles from './SalesPage.module.scss'

export default class SalesPage extends Component {
  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="sales" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Sales</h1>
            <ButtonNormal name="Add record" className={styles.button} />
          </div>
          <SalesTable />
        </div>
      </div>
    )
  }
}
