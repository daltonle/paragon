import React, { Component } from 'react'
import { connect } from 'react-redux'
import Appbar from '../../components/appbar/Appbar'
import CatalogueTable from '../../components/tables/CatalogueTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import CatalogueForm from './CatalogueForm'
import { addCatalogue, updateCatalogue } from '../../../state/ducks/catalogues/actions'

import styles from './CataloguePage.module.scss'

class CataloguePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedCatalogue: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  startUpdating = (catalogue) => {
    this.setState({
      updating: true,
      updatedCatalogue: catalogue
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <CatalogueForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{
            price: "0.0"
          }}
          onSubmit={this.props.addCatalogue}
        />
      )
    else if (this.state.updating) {
      const { id, supplier_id, pModel_id, price } = this.state.updatedCatalogue
      let supplierOptions = [], modelOptions = []
      if (this.props.suppliers)
        supplierOptions = this.props.suppliers.map(s => ({ value: s.id, label: `${s.id}: ${s.name}` }))
      if (this.props.models)
        modelOptions = this.props.models.map(m => ({ value: m.id, label: `${m.id}: ${m.name}` }))

      return (
        <CatalogueForm
          onCancel={() => this.setState({ updating: false, updateCatalogue: {} })}
          onFinish={() => this.setState({ updating: false, updateCatalogue: {} })}
          action="Edit"
          initial={{
            supplier_id: supplierOptions[supplierOptions.findIndex(s => s.value === supplier_id)],
            pModel_id: modelOptions[modelOptions.findIndex(m => m.value === pModel_id)],
            price,
            id
          }}
          onSubmit={this.props.updateCatalogue}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Catalogues</h1>
          {this.props.role === "Admin" ?
            <ButtonNormal name="Add item" className={styles.button} onClick={() => this.setState({ adding: true })} /> :
            <div></div>
          }
        </div>
        <CatalogueTable onStartUpdate={this.startUpdating} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="catalogues" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  suppliers: state.suppliers.data,
  models: state.models.data,
  role: state.user.profile.group
})

const mapDispatchToProps = {
  addCatalogue,
  updateCatalogue
}

export default connect(mapStateToProps, mapDispatchToProps)(CataloguePage)