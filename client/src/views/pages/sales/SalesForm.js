import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Toggle from 'react-toggle'
import Select from 'react-select'
import PlusIcon from 'react-feather/dist/icons/plus'
import XIcon from 'react-feather/dist/icons/x'
import { ButtonNormal, GhostButton } from '../../components/buttons/Buttons'

import "react-toggle/style.css"

import headerStyles from './SalesPage.module.scss'
import styles from './SalesForm.module.scss'

class SalesForm extends Component {
  componentDidMount = () => {
    
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

  renderItems = (values, errors, touched, setFieldValue) => {
    let modelOptions = [], quantityOptions = []
    if (this.props.models)
      modelOptions = this.props.models.map(m => ({ value: m.id, label: `${m.id}: ${m.name} ($${m.price})` }))
    for (let i = 0; i < 10; i++)
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
            onChange={value => setFieldValue(
              'items',
              this.changeItemModel(values.items, index, this.props.models[this.props.models.findIndex(m => m.id === value.value)])
            )}
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
            onChange={value => setFieldValue(
              'items',
              this.changeItemQuantity(values.items, index, value.value)
            )}
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
        <h6 className={styles.errors}>{errors.items && errors.items[index] && touched.items[index] && errors.items[index]}</h6>
        
      </div>
    ))
  }

  calculateTotalValue = ({ discount, items }) => {
    let total = 0
    items.forEach(item => {
      if (item.quantity !== '' && item.id !== '' && item.name !== '') {
        total += parseFloat(this.props.models[this.props.models.findIndex(d => d.id === item.id)].price) * parseFloat(item.quantity)
      }
    })
    return total * (100 - discount) / 100
  }

  render() {
    const { onCancel } = this.props
    let customerOptions = []
    if (this.props.customers)
      customerOptions = this.props.customers.map(c => ({ value: c.id, label: `${c.id}: ${c.name}` }))

    return (
      <Formik
        initialValues={this.props.initial}
        validate={values => {
          let errors = {}
          if (!values.customerId)
            errors.customerId = 'Required'
          if (values.items.length === 0)
            errors.superItems = 'Required'
          else values.items.forEach((item, index) => {
            if (!item)
              errors.items[index] = 'Model is required'
          })
          return errors
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          values.value = this.calculateTotalValue(values)
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
                <h1>{this.props.action} sale record</h1>
                <div className={styles.buttonGroup}>
                  <GhostButton name="Cancel" className={styles.button} onClick={onCancel} />
                  <ButtonNormal name="Save" className={styles.button} type="submit" isSubmitting={isSubmitting} />
                </div>
              </div>
              <div className={styles.form}>
                <label className={styles.customer}>
                  <span>Customer</span>
                  <Select
                    defaultValue={this.props.initial.customerId === undefined ? undefined : { 
                      value: this.props.initial.customerId, 
                      label: customerOptions[customerOptions.findIndex(c => c.value === this.props.initial.customerId)].label
                    }}
                    className={styles.selectInput}
                    placeholder="Customer"
                    options={customerOptions}
                    onChange={value => setFieldValue('customerId', value.value)}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#389589'
                      }
                    })}
                  />
                </label>
                <h6 className={styles.errors}>{errors.customerId && touched.customerId && errors.customerId}</h6>
                <label className={styles.discount}>
                  <span>Discount</span>
                  <input
                    type="text"
                    name="discount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discount}
                    placeholder="Discount"
                    className={styles.textField}
                  />
                </label>
                <h6 className={styles.errors}>{errors.address && touched.address && errors.address}</h6>
                <div className={styles.models}>
                  <div className={styles.modelsHeaders}>
                    Items
                  </div>
                  {this.renderItems(values, errors, touched, setFieldValue)}
                  <h6 className={styles.errors}>{errors.superItems && touched.superItems && errors.superItems}</h6>
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
  customers: state.customers.data,
  models: state.models.data
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesForm)