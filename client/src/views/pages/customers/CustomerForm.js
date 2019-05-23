import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Toggle from 'react-toggle'
import Select from 'react-select'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'
import { addCustomer } from '../../../state/ducks/customers/actions'

import "react-toggle/style.css"

import headerStyles from './CustomersPage.module.scss'
import styles from './CustomerForm.module.scss'

class CustomerForm extends Component {
  render() {
    const { onCancel } = this.props
    const subjectOptions = [
      { value: "aircraft", label: "Aircrafts"},
      { value: "car", label: "Cars" },
      { value: "train", label: "Trains" },
      { value: "boat", label: "Boats" }
    ]
    const modelTypeOptions = [
      { value: 'static', label: 'Static' },
      { value: "working", label: "Working" },
      { value: "display", label: "Display" }
    ]

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
          modelTypeInterests: []
        }}
        validate={values => {
          let errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          this.props.addCustomer(values)
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
                <h1>Add customer record</h1>
                <div className={styles.buttonGroup}>
                  <GhostButton name="Cancel" className={styles.button} onClick={onCancel} />
                  <ButtonNormal name="Save" className={styles.button} type="submit"/>
                </div>
              </div>
              <div className={styles.form}>
                <label>
                  <span>Name</span>
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Name"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.name && touched.name && errors.name}</h6>
                <label>
                  <span>Address</span>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Address"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.address && touched.address && errors.address}</h6>
                <label>
                  <span>Phone number</span>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    placeholder="Phone number"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.phone && touched.phone && errors.phone}</h6>
                <div className={styles.creditLine}>
                  <label className={styles.inputField}>
                    <span>Credit Line</span>
                    <input
                      type="text"
                      name="creditLine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditLine}
                      placeholder="Credit line"
                      className={styles.textField}
                      disabled={!values.hasCreditLine}
                    />
                  </label>
                  <label className={styles.toggleButton}>
                    <Toggle
                      name="hasCreditLine"
                      checked={values.hasCreditLine}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <h6 className={styles.errors}>{errors.creditLine && touched.creditLine && errors.creditLine}</h6>
                <label className={styles.clubMember}>
                  <span>Club member</span>
                  <Toggle
                    name="isMember"
                    checked={values.isMember}
                    onChange={handleChange}
                    className={styles.toggle}
                  />
                </label>
                <div className={styles.interests}>
                  <label>
                    <span>Subject interests</span>
                    <Select
                      className={styles.selectInput}
                      options={subjectOptions}
                      isMulti
                      onChange={value => setFieldValue('subjectInterests', value)}
                    />
                  </label>
                  <label>
                    <span>Model type interests</span>
                    <Select
                      className={styles.selectInput}
                      options={modelTypeOptions}
                      isMulti
                      onChange={value => setFieldValue('modelTypeInterests', value)}
                    />
                  </label>
                </div>
                <h6 className={styles.errors}>{status && status.message && status.message}</h6>
              </div>
            </form>
          )}
      </Formik>
    )
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = {
  addCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)