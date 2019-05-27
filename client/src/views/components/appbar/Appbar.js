import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import styles from './Appbar.module.scss'

/**
 * Static component at the moment. Needs to configure router and redux in future development
 */
class Appbar extends React.Component {
  render() {
    const { active, role, first_name, last_name } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.username}>
          {first_name} {last_name}
        </div>
        <div className={styles.header}></div>
        <Link to="/sales" className={classNames({[styles.menuActive]: active === 'sales', [styles.section]: true})}>Sales</Link>
        <Link to="/customers" className={classNames({[styles.menuActive]: active === 'customers', [styles.section]: true})}>Customers</Link>
        <Link to="/models" className={classNames({[styles.menuActive]: active === 'models', [styles.section]: true})}>Models</Link>
        
        <div className={styles.header} style={{display: role === "Staff" ? "none" : "block"}}></div>
        <Link to="/staff" className={classNames({[styles.menuActive]: active === 'users', [styles.section]: true})} style={{display: role === "Staff" ? "none" : "block"}}>Staff</Link>
        <Link to="/locations" className={classNames({[styles.menuActive]: active === 'locations', [styles.section]: true})} style={{display: role === "Staff" ? "none" : "block"}}>Locations</Link>
        
        <div className={styles.header}></div>
        <Link to="/suppliers" className={classNames({[styles.menuActive]: active === 'suppliers', [styles.section]: true})}>Suppliers</Link>
        <Link to="/catalogues" className={classNames({[styles.menuActive]: active === 'catalogues', [styles.section]: true})}>Catalogues</Link>
        <Link to="/stock-order" className={classNames({[styles.menuActive]: active === 'stockOrders', [styles.section]: true})}>Stock order</Link>
        <Link to="/profile" className={classNames({[styles.menuActive]: active === 'profile', [styles.section]: true})}>Profile</Link>
        <div className={styles.logout} onClick={() => {
          localStorage.removeItem('ParagonToken')
          this.props.history.push('/login')
        }}>
          Log out
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  role: state.user.profile.group,
  first_name: state.user.first_name,
  last_name: state.user.last_name
})

export default connect(mapStateToProps, {})(Appbar)