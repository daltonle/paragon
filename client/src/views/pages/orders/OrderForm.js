import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { round } from 'lodash'
import Select from 'react-select'
import PlusIcon from 'react-feather/dist/icons/plus'
import XIcon from 'react-feather/dist/icons/x'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"

import headerStyles from './OrderPage.module.scss'
import styles from './OrderForm.module.scss'

class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenSupplier: undefined
    }
  }

  changeItemModel = (items, index, newModel) => {
    const itemList = [...items]
    itemList.splice(index, 1, {
      ...items[index],
      id: newModel.id,
      name: newModel.name,
    })
    return itemList
  }

  changeItemQuantity = (items, index, newQuantity) => {
    const itemList = [...items]
    itemList.splice(index, 1, {
      ...items[index],
      quantity: newQuantity
    })
    return itemList
  }

  renderItems = (values, errors, touched, setFieldValue, setFieldTouched) => {
    let modelOptions = [], quantityOptions = []
    if (this.state.chosenSupplier && this.props.catalogues && this.props.models && this.props.models.length > 0) {
      const { models, catalogues } = this.props
      modelOptions = catalogues
        .filter(c => c.supplier_id === this.state.chosenSupplier)
        .map(c => {
          const model = models[models.findIndex(m => m.id === c.pModel_id)]
          return {
            value: model.id,
            label: `${model.id}: ${model.name} ($${model.price})`
          }
        })
    }
    for (let i = 0; i < 100; i++)
      quantityOptions.push({ value: i+1, label: `${i+1}` })

    return values.items.map((item, index) => (
      <div key={index} className={styles.modelItem} style={{zIndex: `${1000-index}`}}> 
        <div className={styles.modelItemDetail}>
          <Select
            defaultValue={item.id === "" ? undefined : {
              value: item.id,
              label: modelOptions[modelOptions.findIndex(m => m.value === item.id)].label
            }}
            placeholder="Model"
            className={styles.modelItemInput}
            options={modelOptions}
            onChange={value => {
              setFieldValue(
                'items',
                this.changeItemModel(values.items, index, this.props.models[this.props.models.findIndex(m => m.id === value.value)])
              )
              setFieldTouched(`itemModel${index}`, true)
            }}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#389589'
              }
            })}
          />
          <Select
            defaultValue={item.quantity === "" ? undefined : {
              value: item.quantity,
              label: quantityOptions[quantityOptions.findIndex(q => q.value === item.quantity)].label
            }}
            placeholder="Quantity"
            className={styles.quantityInput}
            options={quantityOptions}
            onChange={value => {
              setFieldValue(
                'items',
                this.changeItemQuantity(values.items, index, value.value)
              )
              setFieldTouched(`itemQuantity${index}`, true)
            }}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#389589'
              }
            })}
          />
          <div className={styles.removeButton}
            onClick={() => {
              let newItems = [...values.items]
              newItems.splice(index, 1)
              setFieldValue('items', newItems)
            }}
          >
            <XIcon className={styles.icon} />
          </div>
        </div>
        <h6 className={styles.errors}>{errors[`itemModel${index}`]}</h6>
        <h6 className={styles.errors}>{errors[`itemQuantity${index}`]}</h6>
      </div>
    ))
  }

  calculateTotalValue = ({ items }) => {
    let total = 0
    items.forEach(item => {
      if (item.quantity !== '' && item.id !== '' && item.name !== '') {
        total += parseFloat(this.props.models[this.props.models.findIndex(d => d.id === item.id)].price) * parseFloat(item.quantity)
      }
    })
    return round(total, 2)
  }

  render() {
    let supplierOptions = []
    if (this.props.suppliers)
    supplierOptions = this.props.suppliers.map(s => ({ value: s.id, label: `${s.id}: ${s.name}` }))

    return (
      <Formik
        initialValues={this.props.initial}
        validate={(values) => {
          let errors = {}
          if (!values.supplierId)
            errors.supplier = 'Required'
          if (values.items.length === 0)
            errors.superItems = 'Required'
          else values.items.forEach((item, index) => {
            if (!item.id)
              errors[`itemModel${index}`] = 'Model is required'
            else if (!item.quantity)
              errors[`itemQuantity${index}`] = 'Quantity is required'
          })
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus, setFieldValue, resetForm }) => {
          setSubmitting(true)
          values.value = this.calculateTotalValue(values)
          this.props.onSubmit(values)
          setSubmitting(false)
          resetForm()
          setFieldValue('supplierId', undefined)
          setFieldValue('items', [])
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
            setFieldTouched,
            isSubmitting,
            resetForm
          }) => (
            <form onSubmit={handleSubmit} className={headerStyles.formContainer}>
              <div className={headerStyles.header}>
                <h1>Order stock</h1>
                <div className={styles.buttonGroup}>
                  <ButtonNormal name="Submit order" className={styles.button} type="submit" isSubmitting={isSubmitting} />
                </div>
              </div>
              <div className={styles.form}>
                <label className={styles.supplier}>
                  <span>Supplier *</span>
                  <Select
                    defaultValue={values.supplierId}
                    className={styles.selectInput}
                    placeholder="Supplier"
                    options={supplierOptions}
                    onChange={value => {
                      setFieldValue('supplierId', value.value)
                      setFieldValue('items', [])
                      this.setState({ chosenSupplier: value.value })
                    }}
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
                <div className={styles.models}>
                  <div className={styles.modelsHeaders}>
                    Items *
                  </div>
                  {this.renderItems(values, errors, touched, setFieldValue, setFieldTouched)}
                  <h6 className={styles.errors}>{errors.superItems}</h6>
                  <div className={styles.addItem}
                    onClick={() => {
                      let newItems = [...values.items]
                      newItems.push({ id: '', name: '', quantity: '' })
                      setFieldValue('items', newItems)
                    }}
                  >
                    <PlusIcon className={styles.icon}/>
                    <span>Add item</span>
                  </div>
                </div>
                <h6 className={styles.errors}>{status && status.message && status.message}</h6>
                <h5>Total value: ${this.calculateTotalValue(values)}</h5>
              </div>
            </form>
          )}
      </Formik>
    )
  }
}

const mapStateToProps = (state) => ({
  suppliers: state.suppliers.data,
  models: state.models.data,
  catalogues: state.catalogues.data
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)