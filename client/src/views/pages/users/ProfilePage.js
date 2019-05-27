import React, { Component } from 'react'
import { connect } from 'react-redux'
import Appbar from '../../components/appbar/Appbar'
import UserForm from './UserForm'
import { updateProfile } from '../../../state/ducks/user/actions'
import { getLocations } from '../../../state/ducks/locations/actions'

import styles from './ProfilePage.module.scss'

class ProfilePage extends Component {
  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
    this.props.getLocations()
  }

  renderContent = () => {
    const { id, first_name, last_name, username, email, profile } = this.props.user
    let locationOptions = [], locationValue = { value: profile.location, label: profile.location }
    if (this.props.locations) {
      locationOptions = this.props.locations.map(l => ({ value: l.id, label: `${l.city} ${l.state} ${l.postcode}` }))
      locationValue = locationOptions[locationOptions.findIndex(l => l.value === profile.location)]
    }
    return (
      <UserForm
        onCancel={() => this.props.history.goBack()}
        onFinish={() => this.props.history.push("/")}
        action="Profile"
        initial={{
          id,
          first_name,
          last_name,
          username,
          email,
          profile: {
            ...profile,
            group: { value: profile.group, label: profile.group },
            location: locationValue
          }
        }}
        onSubmit={this.props.updateProfile}
      />
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="profile" history={this.props.history} />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations.data,
  user: state.user
})

const mapDispatchToProps = {
  updateProfile,
  getLocations
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)