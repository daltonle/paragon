import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import styles from './Appbar.module.scss'

/**
 * Static component at the moment. Needs to configure router and redux in future development
 */
export const Appbar = (props) => (
  <div className={styles.container}>
    <div className={styles.username}>
      timothy
    </div>
    <div className={styles.header}>
      
    </div>
    <Link to="/sales" className={classNames({[styles.menuActive]: props.active === 'sales', [styles.section]: true})}>Sales</Link>
    <Link to="/customers" className={classNames({[styles.menuActive]: props.active === 'customers', [styles.section]: true})}>Customers</Link>
    <div className={styles.section}>
      Models
    </div>
    <div className={styles.section}>
      Supplier
    </div>
    <div className={styles.section}>
      Locations
    </div>
    <div className={styles.header}>
      
    </div>
    <div className={styles.section}>
      Groups
    </div>
    <div className={styles.section}>
      Users
    </div>
    <div className={styles.header}>
    </div>
    <div className={styles.section}>
      Stock order
    </div>
    <div className={styles.section}>
      Catalogue
    </div>
    <div className={styles.logout} onClick={() => {
      sessionStorage.removeItem('loggedIn')
      props.history.push('/login')
    }}>
      Log out
    </div>
  </div>
)
