import moment from 'moment'
import {
  GET_MODELS,
  ADD_MODEL,
  UPDATE_MODEL,
  DELETE_MODEL
} from './types'

export const getModels = () => dispatch => {
  fetch('http://localhost:8000/productModel/Model/', {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: GET_MODELS,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const addModel = (model) => dispatch => {
  const { name, type, subject, inStock, price, dateAcquired, location, description, availability } = model
  const data = {
    name,
    inStock,
    price,
    dateAcquired: moment(dateAcquired).format("YYYY-MM-DD"),
    location: location.value,
    subject: subject.value,
    type: type.value,
    description,
    availability
  }

  fetch('http://localhost:8000/productModel/Model/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: ADD_MODEL,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const deleteModel = (id) => dispatch => {
  fetch(`http://localhost:8000/productModel/Model/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_MODEL,
    payload: id
  }))
  .catch(err => console.log(err))
}

export const updateModel = (model) => dispatch => {
  const { name, type, subject, inStock, price, dateAcquired, location, description, availability } = model
  const data = {
    name,
    inStock,
    price: parseFloat(price),
    dateAcquired: moment(dateAcquired).format("YYYY-MM-DD"),
    location: location.value,
    subject: subject.value,
    type: type.value,
    description,
    availability
  }

  fetch(`http://localhost:8000/productModel/Model/${model.id}/`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: UPDATE_MODEL,
      payload: res
    })
  })
  .catch(err => console.log(err))
}