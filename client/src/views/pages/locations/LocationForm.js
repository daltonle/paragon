import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Select from 'react-select'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"

import headerStyles from './LocationPage.module.scss'
import styles from './LocationForm.module.scss'

class LocationForm extends Component {
  render() {
    const { onCancel } = this.props
    const stateOptions = [
      { value: "NSW", label: "NSW" },
      { value: "VIC", label: "VIC" },
      { value: "ACT", label: "ACT" },
      { value: "NT", label: "NT" },
      { value: "WA", label: "WA" },
      { value: "QLD", label: "QLD" },
      { value: "SA", label: "SA" },
      { value: "TAS", label: "TAS" },
    ]

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.street)
            errors.street = "Required"
          if (!values.city)
            errors.city = "Required"
          if (!values.state)
            errors.state = "Required"
          if (!values.postcode)
            errors.postcode = "Required"
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          const submitData = {
            ...values,
            state: values.state.value
          }
          setSubmitting(true)
          this.props.onSubmit(submitData)
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
                <h1>{this.props.action} location</h1>
                <div className={styles.buttonGroup}>
                  <GhostButton name="Cancel" className={styles.button} onClick={onCancel} />
                  <ButtonNormal name="Save" className={styles.button} type="submit" isSubmitting={isSubmitting} />
                </div>
              </div>
              <div className={styles.form}>
                <label>
                  <span>Street address</span>
                  <input
                    type="text"
                    name="street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                    placeholder="Street address"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.street && touched.street && errors.street}</h6>
                <label>
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    placeholder="City"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.city && touched.city && errors.city}</h6>
                <label className={styles.state}>
                  <span>State</span>
                  <Select
                    defaultValue={this.props.initial.state}
                    className={styles.selectInput}
                    options={stateOptions}
                    onChange={value => setFieldValue('state', value)}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#389589'
                      }
                    })}
                  />
                </label>
                <h6 className={styles.errors}>{errors.state}</h6>
                <label className={styles.postcode}>
                  <span>Postcode</span>
                  <input
                    type="text"
                    name="postcode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postcode}
                    placeholder="Postcode"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.postcode && touched.postcode && errors.postcode}</h6>
                <h6 className={styles.errors}>{status && status.message && status.message}</h6>
              </div>
            </form>
          )}
      </Formik>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm)