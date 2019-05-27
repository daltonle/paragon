import React, { Component } from 'react'
import { connect } from 'react-redux'
import Appbar from '../../components/appbar/Appbar'
import SalesTable from '../../components/tables/SalesTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import SalesForm from './SalesForm'
import { addSale, updateSale } from '../../../state/ducks/sales/actions'
import { getCustomers } from '../../../state/ducks/customers/actions'
import { getModels } from '../../../state/ducks/models/actions'

import styles from './SalesPage.module.scss'

class SalesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedSale: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
    this.props.getCustomers()
    this.props.getModels()
  }

  startUpdating = (sale) => {
    this.setState({
      updating: true,
      updatedSale: sale
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <SalesForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{
            discount: 0,
            value: '',
            items: []
          }}
          onSubmit={this.props.addSale}
        />
      )
    else if (this.state.updating) {
      const { customerId, discount, value, items, id } = this.state.updatedSale
      return (
        <SalesForm
          onCancel={() => this.setState({ updating: false, updatedSale: {} })}
          onFinish={() => this.setState({ updating: false, updatedSale: {} })}
          action="Edit"
          initial={{
            id,
            customerId,
            discount,
            value,
            items
          }}
          onSubmit={this.props.updateSale}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Sales</h1>
          <ButtonNormal name="Add record" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <SalesTable onStartUpdate={this.startUpdating} />
      </div> 
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="sales" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  addSale,
  updateSale,
  getCustomers,
  getModels
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesPage)