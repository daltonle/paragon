import React from 'react'
import styles from './Appbar.module.scss'

/**
 * Static component at the moment. Needs to configure router and redux in future development
 */
export const Appbar = (props) => (
  <div className={styles.container}>
    <div className={styles.username}>
      timothy65
    </div>
    <div className={styles.header}>
      DATABASE
    </div>
    <div className={styles.section}>
      Sales
    </div>
    <div className={styles.section}>
      Customers
    </div>
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
      PEOPLE
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
    <div className={styles.logout}>
      Log out
    </div>
  </div>
)
