import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Appbar } from '../../components/appbar/Appbar'
import UserTable from '../../components/tables/UserTable'
import { ButtonNormal } from '../../components/buttons/Buttons'
import UserForm from './UserForm'
import { addUser, updateUser } from '../../../state/ducks/users/actions'

import styles from './UserPage.module.scss'

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      updating: false,
      updatedUser: {}
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("ParagonToken"))
      this.props.history.push('/login')
  }

  startUpdating = (user) => {
    this.setState({
      updating: true,
      updatedUser: user
    })
  }

  renderContent = () => {
    if (this.state.adding)
      return (
        <UserForm 
          onCancel={() => this.setState({ adding: false })}  
          onFinish={() => this.setState({ adding: false })}
          action="Add"
          initial={{
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            repassword: '',
            email: '',
            profile: {
              address: '',
              phoneNum: ''
            }
          }}
          onSubmit={this.props.addUser}
        />
      )
    else if (this.state.updating) {
      const { id, first_name, last_name, username, email, profile } = this.state.updatedUser
      let locationOptions = []
      if (this.props.locations)
        locationOptions = this.props.locations.map(l => ({ value: l.id, label: `${l.city} ${l.state} ${l.postcode}` }))
      return (
        <UserForm
          onCancel={() => this.setState({ updating: false, updatedUser: {} })}
          onFinish={() => this.setState({ updating: false, updatedUser: {} })}
          action="Edit"
          initial={{
            id,
            first_name,
            last_name,
            username,
            email,
            profile: {
              ...profile,
              group: { value: profile.group, label: profile.group },
              location: locationOptions[locationOptions.findIndex(l => l.value === profile.location)]
            }
          }}
          onSubmit={this.props.updateUser}
        />
      )
    }
    else return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Staff</h1>
          <ButtonNormal name="Add staff" className={styles.button} onClick={() => this.setState({ adding: true })} />
        </div>
        <UserTable onStartUpdate={this.startUpdating} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.appbar}>
          <Appbar active="users" history={this.props.history} />
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
  addUser,
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)