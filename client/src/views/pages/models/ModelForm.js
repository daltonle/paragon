import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Toggle from 'react-toggle'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"
import "react-datepicker/dist/react-datepicker.css"

import headerStyles from './ModelPage.module.scss'
import styles from './ModelForm.module.scss'

class ModelForm extends Component {
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
    let locationOptions = []
    if (this.props.locations)
      locationOptions = this.props.locations.map(l => ({ value: l.id, label: `${l.city} ${l.state} ${l.postcode}` }))

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.name)
            errors.name = "Required"
          if (!values.location)
            errors.location = "Required"
          if (!values.inStock)
            errors.inStock = "Required"
          else if (
            !/^[0-9]+$/.test(values.inStock)
          )
            errors.inStock = "Invalid number"
          if (!values.price)
            errors.price = "Required"
          else if (
            !/^[0-9]+\.*[0-9]*$/.test(values.price)
          )
            errors.price = "Invalid number"
          if (!values.subject)
            errors.subject = "Required"
          if (!values.type)
            errors.type = "Required"
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
                <div className={styles.subjectType}>
                  <div>
                    <label>
                      <span>Subject</span>
                      <Select
                        defaultValue={this.props.initial.subject}
                        className={styles.selectInput}
                        options={subjectOptions}
                        onChange={value => setFieldValue('subject', value)}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#389589'
                          }
                        })}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.subject}</h6>
                  </div>
                  <div>
                    <label>
                      <span>Type</span>
                      <Select
                        defaultValue={this.props.initial.type}
                        className={styles.selectInput}
                        options={modelTypeOptions}
                        onChange={value => setFieldValue('type', value)}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#389589'
                          }
                        })}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.type}</h6>
                  </div>
                </div>
                <div className={styles.stock}>
                  <div>
                    <label>
                      <span>Number in stock</span>
                      <input
                        type="text"
                        name="inStock"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.inStock}
                        placeholder="Number in stock"
                        className={styles.textField}
                      />
                    </label>
                    <h6 className={styles.errors}>{errors.inStock && touched.inStock && errors.inStock}</h6>
                  </div>
                  <label className={styles.availability}>
                    <span>Available</span>
                    <Toggle
                      name="availability"
                      checked={values.availability}
                      onChange={handleChange}
                      className={styles.toggle}
                    />
                  </label>
                </div>
                <div className={styles.dateAcquired}>
                  <label>
                    <span>Date acquired</span>
                    <DatePicker
                      selected={values.dateAcquired}
                      onChange={value => setFieldValue('dateAcquired', value)}
                      dateFormat="dd/MM/yyyy"
                      className={styles.datepicker}
                    />
                  </label>
                </div>
                <label className={styles.price}>
                  <span>Price</span>
                  <input
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    placeholder="Price"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.price && touched.price && errors.price}</h6>
                <label className={styles.location}>
                  <span>Location</span>
                  <Select
                    defaultValue={this.props.initial.location}
                    className={styles.selectInput}
                    options={locationOptions}
                    onChange={value => setFieldValue('location', value)}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#389589'
                      }
                    })}
                  />
                </label>
                <h6 className={styles.errors}>{errors.location}</h6>
                <label>
                  <span>Description</span>
                  <textarea
                    type="text"
                    row={4}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Description"
                    className={styles.textField}
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

const mapStateToProps = (state) => ({
  locations: state.locations.data
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelForm)