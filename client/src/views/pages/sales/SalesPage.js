import React, { Component } from 'react'
import { Appbar } from '../../components/appbar/Appbar'
import SalesTable from '../../components/tables/SalesTable'
import { ButtonNormal } from '../../components/buttons/Buttons'

import styles from './SalesPage.module.scss'

export default class SalesPage extends Component {
  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="sales" history={this.props.history} />
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
