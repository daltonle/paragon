import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Appbar } from '../../components/appbar/Appbar'
import LocationTable from '../../components/tables/LocationTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import LocationForm from './LocationForm'
import { addLocation, updateLocation } from '../../../state/ducks/locations/actions'

import styles from './LocationPage.module.scss'

class ModelPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedLocation: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  startUpdating = (location) => {
    this.setState({
      updating: true,
      updatedLocation: location
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <LocationForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{
            street: '',
            city: '',
            postcode: ''
          }}
          onSubmit={this.props.addLocation}
        />
      )
    else if (this.state.updating) {
      const { id, street, city, state, postcode } = this.state.updatedLocation
      return (
        <LocationForm
          onCancel={() => this.setState({ updating: false, updatedModel: {} })}
          onFinish={() => this.setState({ updating: false, updatedModel: {} })}
          action="Edit"
          initial={{
            id,
            street,
            city,
            state: { value: state, label: state },
            postcode
          }}
          onSubmit={this.props.updateLocation}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Locations</h1>
          <ButtonNormal name="Add location" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <LocationTable onStartUpdate={this.startUpdating} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="locations" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  addLocation,
  updateLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage)