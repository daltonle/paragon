import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Toggle from 'react-toggle'
import Select from 'react-select'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"

import headerStyles from './CustomersPage.module.scss'
import styles from './CustomerForm.module.scss'

class CustomerForm extends Component {
  render() {
    const { onCancel } = this.props
    const subjectOptions = [
      { value: "Aircraft", label: "Aircraft"},
      { value: "Car", label: "Car" },
      { value: "Train", label: "Train" },
      { value: "Boat", label: "Boat" },
      { value: "Other", label: "Other" }
    ]
    const modelTypeOptions = [
      { value: 'Static', label: 'Static' },
      { value: "Working", label: "Working" },
      { value: "Display", label: "Display" },
      { value: "Other", label: "Other" }
    ]

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          if (!values.address) {
            errors.address = 'Required'
          }
          if (!values.phone) {
            errors.phone = 'Required'
          }
          if (values.hasCreditLine && !values.creditLine) {
            errors.creditLine = 'Required'
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
                <h1>{this.props.action} customer record</h1>
                <div className={styles.buttonGroup}>
                  <GhostButton name="Cancel" className={styles.button} onClick={onCancel} />
                  <ButtonNormal name="Save" className={styles.button} type="submit" isSubmitting={isSubmitting} />
                </div>
              </div>
              <div className={styles.form}>
                <label>
                  <span>Name</span>
                  <input
                    type="text"
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
                  <span>Email</span>
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
                      defaultValue={this.props.initial.subjectInterests}
                      className={styles.selectInput}
                      options={subjectOptions}
                      isMulti
                      onChange={value => setFieldValue('subjectInterests', value)}
                    />
                  </label>
                  <label>
                    <span>Model type interests</span>
                    <Select
                      defaultValue={this.props.initial.modelTypeInterests}
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)