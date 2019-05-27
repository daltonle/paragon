import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Appbar from '../../components/appbar/Appbar'
import ModelTable from '../../components/tables/ModelTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import ModelForm from './ModelForm'
import { addModel, updateModel } from '../../../state/ducks/models/actions'

import styles from './ModelPage.module.scss'

class ModelPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedModel: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  startUpdating = (model) => {
    this.setState({
      updating: true,
      updatedModel: model
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <ModelForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{
            name: '',
            inStock: '',
            price: '',
            dateAcquired: moment().toDate(),
            description: '',
            availability: false
          }}
          onSubmit={this.props.addModel}
        />
      )
    else if (this.state.updating) {
      const { id, name, type, subject, inStock, availability, price, dateAcquired, location, description } = this.state.updatedModel
      let locationOptions = []
      if (this.props.locations)
        locationOptions = this.props.locations.map(l => ({ value: l.id, label: `${l.city} ${l.state} ${l.postcode}` }))
      return (
        <ModelForm
          onCancel={() => this.setState({ updating: false, updatedModel: {} })}
          onFinish={() => this.setState({ updating: false, updatedModel: {} })}
          action="Edit"
          initial={{
            id,
            name,
            type: { value: type, label: type },
            subject: { value: subject, label: subject },
            price,
            inStock,
            availability,
            dateAcquired: moment(dateAcquired, "YYYY-MM-DD").toDate(),
            location: locationOptions[locationOptions.findIndex(l => l.value === location)],
            description: description === null ? undefined : description
          }}
          onSubmit={this.props.updateModel}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Models</h1>
          <ButtonNormal name="Add model" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <ModelTable onStartUpdate={this.startUpdating} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="models" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations.data
})

const mapDispatchToProps = {
  addModel,
  updateModel
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage)