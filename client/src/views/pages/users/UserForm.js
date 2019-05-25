import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Select from 'react-select'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"
import "react-datepicker/dist/react-datepicker.css"

import headerStyles from './UserPage.module.scss'
import styles from './UserForm.module.scss'

class UserForm extends Component {
  render() {
    const { onCancel } = this.props
    let locationOptions = []
    if (this.props.locations)
      locationOptions = this.props.locations.map(l => ({ value: l.id, label: `${l.city} ${l.state} ${l.postcode}` }))
    const roleOptions = [
      { value: 'Admin', label: 'Admin' },
      { value: 'Staff', label: 'Staff' }
    ]

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.first_name) {
            errors.first_name = 'Required'
          }
          if (!values.last_name) {
            errors.last_name = 'Required'
          }
          if (!values.username) {
            errors.username = 'Required'
          }
          else if (values.username.length < 6)
            errors.username = 'Username has to be at least 6 characters.'
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          if (values.profile.phoneNum && !/^0[0-9]{9,10}$/i.test(values.profile.phoneNum))
            errors.phoneNum = 'Invalid phone number'
          if (!values.password)
            errors.password = 'Required'
          else {
            if (values.password.length < 6)
              errors.password = 'Password has to be at least 6 characters.'
            if (!values.repassword)
              errors.repassword = 'Required'
            else if (values.password !== values.repassword)
              errors.repassword = 'Password does not match'
          }
          if (!values.profile.group) {
            errors.group = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          this.props.onSubmit(values)
          setSubmitting(false)
          this.props.onFinish()
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
            setFieldValue,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className={headerStyles.content}>
              <div className={headerStyles.header}>
                <h1>{this.props.action} model</h1>
                <div className={styles.buttonGroup}>
                  <GhostButton name="Cancel" className={styles.button} onClick={onCancel} />
                  <ButtonNormal name="Save" className={styles.button} type="submit" isSubmitting={isSubmitting} />
                </div>
              </div>
              <div className={styles.form}>
                <div className={styles.name}>
                  <div>
                    <label>
                      <span>First name *</span>
                      <input
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        placeholder="First name"
                        className={styles.textField}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.first_name && touched.first_name && errors.first_name}</h6>
                  </div>
                  <div>
                    <label>
                      <span>Last name *</span>
                      <input
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        placeholder="Last name"
                        className={styles.textField}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.last_name && touched.last_name && errors.last_name}</h6>
                  </div>
                </div>
                <label className={styles.username}>
                  <span>Username *</span>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.username && touched.username && errors.username}</h6>
                {this.props.action === "Add" ? 
                  <div className={styles.password}>
                    <label>
                      <span>Temporary password *</span>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password"
                        className={styles.textField}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.password && touched.password && errors.password}</h6>
                    <label>
                      <span>Re-enter password *</span>
                      <input
                        type="password"
                        name="repassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.repassword}
                        placeholder="Re-enter password"
                        className={styles.textField}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.repassword && touched.repassword && errors.repassword}</h6>
                  </div> :
                  <div></div>
                }
                <label className={styles.email}>
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.email && touched.email && errors.email}</h6>
                <label>
                  <span>Address</span>
                  <input
                    type="text"
                    name="profile.address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile.address}
                    placeholder="Address"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.address && touched.address && errors.address}</h6>
                <label>
                  <span>Phone number</span>
                  <input
                    type="text"
                    name="profile.phoneNum"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile.phoneNum}
                    placeholder="Phone number"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.phoneNum && touched.phoneNum && errors.phoneNum}</h6>
                <div className={styles.roleLoc}>
                  <div className={styles.role}>
                    <label>
                      <span>Role *</span>
                      <Select
                        defaultValue={this.props.initial.profile.group}
                        className={styles.selectInput}
                        options={roleOptions}
                        onChange={value => setFieldValue('profile.group', value)}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#389589'
                          }
                        })}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.group}</h6>
                  </div>
                  <label className={styles.location}>
                    <span>Location</span>
                    <Select
                      defaultValue={this.props.initial.profile.location}
                      className={styles.selectInput}
                      options={locationOptions}
                      onChange={value => setFieldValue('profile.location', value)}
                      theme={theme => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: '#389589'
                        }
                      })}
                    />
                  </label>
                </div>
                {this.props.action === "Edit" ?
                  <div className={styles.identity}> 
                    <label>
                      <span>Confirm your identity *</span>
                      <input
                        defaultValue=""
                        type="password"
                        name="password"
                        onChange={e => {
                          console.log(e.target.value)
                          setFieldValue('password', e.target.value)
                          setFieldValue('repassword', e.target.value)
                        }}
                        onBlur={handleBlur}
                        placeholder="Password"
                        className={styles.textField}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.password && touched.password && errors.password}</h6>
                  </div> :
                  <div></div>
                }
              </div>
            </form>
          )}
      </Formik>
    )
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations.data
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)