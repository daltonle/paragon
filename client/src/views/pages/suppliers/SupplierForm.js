import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Toggle from 'react-toggle'
import Select from 'react-select'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"

import headerStyles from './SupplierPage.module.scss'
import styles from './SupplierForm.module.scss'

class SupplierForm extends Component {
  render() {
    const { onCancel } = this.props
    

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.name)
            errors.name = "Required"
          if (!values.address)
            errors.address = "Required"
          if (values.hasCreditLine && !values.creditLine)
            errors.creditLine = "Required"
          if (!values.balance)
            errors.balance = "Required"
          else if (values.hasCreditLine.length > 10) {
            errors.creditLine = 'Invalid credit line'
          }
          if (!values.balance)
            errors.balance = "Required"
          else if (
            !/^[+|-]{0,1}[0-9]+\.*[0-9]*$/.test(values.balance)
          )
            errors.balance = "Invalid number"
          if (!values.contactPerson)
            errors.contactPerson = "Required"
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          const submitData = {
            ...values,
            balance: parseFloat(values.balance)
          }
          console.log(submitData)
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
                <h1>{this.props.action} supplier</h1>
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
                <div className={styles.creditLine}>
                  <label className={styles.inputField}>
                    <span>Credit line</span>
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
                <label className={styles.balance}>
                  <span>Balance</span>
                  <input
                    type="text"
                    name="balance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.balance}
                    placeholder="Balance"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.balance && touched.balance && errors.balance}</h6>
                <label>
                  <span>Delivery notes</span>
                  <textarea
                    type="text"
                    row={4}
                    name="deliveryNotes"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.deliveryNotes}
                    placeholder="Delivery notes"
                    className={styles.textField}
                  />
                </label>
                <label>
                  <span>Contact person</span>
                  <textarea
                    type="text"
                    row={2}
                    name="contactPerson"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactPerson}
                    placeholder="Contact person"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.contactPerson && touched.contactPerson && errors.contactPerson}</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierForm)