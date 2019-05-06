import React, { Component } from 'react'
import { Formik } from 'formik'
import Toggle from 'react-toggle'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"

import headerStyles from './CustomersPage.module.scss'
import styles from './CustomerForm.module.scss'

export default class CustomerForm extends Component {
  render() {
    const { onCancel } = this.props

    return (
      <Formik
        initialValues={{ 
          name: '',
          address: '',
          phone: '',
          creditLine: '',
          hasCreditLine: false,
          isMember: false,
          subjectInterests: [],
          modelTypeInterest: []
        }}
        validate={values => {
          let errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          console.log(values)
          setSubmitting(false)
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
            <form onSubmit={handleSubmit} className={headerStyles.content}>
              <div className={headerStyles.header}>
                <h1>Add customer record</h1>
                <div className={styles.buttonGroup}>
                  <GhostButton name="Cancel" className={styles.button} onClick={onCancel} />
                  <ButtonNormal name="Save" className={styles.button} type="submit"/>
                </div>
              </div>
              <div className={styles.form}>
                <input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Name"
                  className={styles.textField}
                />
                <h6 className={styles.errors}>{errors.name && touched.name && errors.name}</h6>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Address"
                  className={styles.textField}
                />
                <h6 className={styles.errors}>{errors.address && touched.address && errors.address}</h6>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  placeholder="Phone number"
                  className={styles.textField}
                />
                <h6 className={styles.errors}>{errors.phone && touched.phone && errors.phone}</h6>
                <input
                  type="text"
                  name="creditLine"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.creditLine}
                  placeholder="Credit line"
                  className={styles.textField}
                />
                <h6 className={styles.errors}>{errors.creditLine && touched.creditLine && errors.creditLine}</h6>
                <label>
                  <span>Credit line</span>
                  <Toggle
                    name="hasCreditLine"
                    checked={values.hasCreditLine}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span>Club member</span>
                  <Toggle
                    name="isMember"
                    checked={values.isMember}
                    onChange={handleChange}
                  />
                </label>
                <h6 className={styles.errors}>{status && status.message && status.message}</h6>
              </div>
            </form>
          )}
      </Formik>
    )
  }
}
