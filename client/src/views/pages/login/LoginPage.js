import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { ButtonNormal } from '../../components/buttons/Buttons'
import { login } from '../../../utils/AuthenticationHelper'
import { setUser } from '../../../state/ducks/user/actions'

import styles from './LoginPage.module.scss'

class LoginPage extends Component {
  componentDidMount = () => {
    if (localStorage.getItem("ParagonToken"))
      this.props.history.push('/')
  }

  render() {
    return (
      <div className={styles.outer}>
        <div className={styles.modal} >
          <h1>Log in to your account</h1>
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={values => {
              let errors = {}
              if (!values.username) {
                errors.username = 'Required'
              } else if (
                !/^[A-Za-z0-9]{6,10}$/i.test(values.username)
              ) {
                errors.username = 'Invalid username'
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              setSubmitting(true)
              const promise = new Promise((resolve, reject) => {
                login(values, resolve, reject)
              })
              promise.then(data => {
                localStorage.setItem("ParagonToken", data.token)
                this.props.setUser(data.user)
                setSubmitting(false)
                this.props.history.push('/')
              })
              .catch(err => {
                setStatus({ message: err })
                setSubmitting(false)
              })
            }}
          >
            {({
              values,
              errors,
              status,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input}>
                  <input
                    type="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                    className={styles.textField}
                  />
                  <h6 className={styles.errors}>{errors.username && touched.username && errors.username}</h6>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    className={styles.textField}
                  />
                  <h6 className={styles.errors}>{errors.password && touched.password && errors.password}</h6>
                  <h6 className={styles.errors}>{status && status.message && status.message}</h6>
                </div>
                <ButtonNormal type="submit" name="LOG IN" isSubmitting={isSubmitting} className={styles.button} />
              </form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
