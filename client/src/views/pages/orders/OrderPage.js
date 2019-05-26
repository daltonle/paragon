import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Appbar } from '../../components/appbar/Appbar'
import OrderHistoryTable from '../../components/tables/OrderHistoryTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import OrderForm from './OrderForm'
import { getSuppliers } from '../../../state/ducks/suppliers/actions'
import { getOrders, addOrder } from '../../../state/ducks/stock-order/actions'
import { getModels } from '../../../state/ducks/models/actions'
import { getCatalogues } from '../../../state/ducks/catalogues/actions'

import styles from './OrderPage.module.scss'

class OrderPage extends Component {
  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
    this.props.getOrders()
    this.props.getModels()
    this.props.getSuppliers()
    this.props.getCatalogues()
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="stockOrders" history={this.props.history} />
        </div>
        <div className={styles.content}>
          <OrderForm 
            initial={{
              value: 0,
              items: []
            }}
            onSubmit={this.props.addOrder}
          />
          <div className={styles.history}>
            <h1>Order history</h1>
            <OrderHistoryTable />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  getOrders,
  addOrder,
  getSuppliers,
  getModels,
  getCatalogues
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)