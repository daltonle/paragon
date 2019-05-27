import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Select from 'react-select'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"
import "react-datepicker/dist/react-datepicker.css"

import headerStyles from './CataloguePage.module.scss'
import styles from './CatalogueForm.module.scss'

class CatalogueForm extends Component {
  render() {
    const { onCancel } = this.props
    let supplierOptions = [], modelOptions = []
    if (this.props.suppliers)
      supplierOptions = this.props.suppliers.map(s => ({ value: s.id, label: `${s.id}: ${s.name}` }))
    if (this.props.models)
      modelOptions = this.props.models.map(m => ({ value: m.id, label: `${m.id}: ${m.name}` }))

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.price)
            errors.price = "Required"
          else if (
            !/^[0-9]+\.*[0-9]*$/.test(values.price)
          )
            errors.price = "Invalid number"
          if (!values.supplier_id)
            errors.supplier = "Required"
          if (!values.pModel_id)
            errors.model = "Required"
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
                <label className={styles.supplier}>
                  <span>Supplier *</span>
                  <Select
                    defaultValue={this.props.initial.supplier_id}
                    className={styles.selectInput}
                    options={supplierOptions}
                    onChange={value => setFieldValue('supplier_id', value)}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#389589'
                      }
                    })}
                  />
                </label>
                <h6 className={styles.errors}>{errors.supplier}</h6>
                <label className={styles.model}>
                  <span>Model *</span>
                  <Select
                    defaultValue={this.props.initial.pModel_id}
                    className={styles.selectInput}
                    options={modelOptions}
                    onChange={value => setFieldValue('pModel_id', value)}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#389589'
                      }
                    })}
                  />
                </label>
                <h6 className={styles.errors}>{errors.model}</h6>
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
                <h6 className={styles.errors}>{status && status.message && status.message}</h6>
              </div>
            </form>
          )}
      </Formik>
    )
  }
}

const mapStateToProps = (state) => ({
  suppliers: state.suppliers.data,
  models: state.models.data
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueForm)