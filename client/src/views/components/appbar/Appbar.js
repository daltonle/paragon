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
    <Link to="/models" className={classNames({[styles.menuActive]: props.active === 'models', [styles.section]: true})}>Models</Link>
    <div className={styles.header}>
    </div>
    <Link to="/users" className={classNames({[styles.menuActive]: props.active === 'users', [styles.section]: true})}>Users</Link>
    <Link to="/locations" className={classNames({[styles.menuActive]: props.active === 'locations', [styles.section]: true})}>Locations</Link>
    <div className={styles.header}>
    </div>
    <Link to="/suppliers" className={classNames({[styles.menuActive]: props.active === 'suppliers', [styles.section]: true})}>Suppliers</Link>
    <Link to="/catalogues" className={classNames({[styles.menuActive]: props.active === 'catalogues', [styles.section]: true})}>Catalogues</Link>
    <Link to="/stock-order" className={classNames({[styles.menuActive]: props.active === 'stockOrders', [styles.section]: true})}>Stock order</Link>
    <div className={styles.logout} onClick={() => {
      localStorage.removeItem('ParagonToken')
      props.history.push('/login')
    }}>
      Log out
    </div>
  </div>
)
