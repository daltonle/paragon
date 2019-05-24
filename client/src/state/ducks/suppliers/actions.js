import {
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER
} from './types'

export const getSuppliers = () => dispatch => {
  fetch('http://localhost:8000/productModel/Supplier/', {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: GET_SUPPLIERS,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const addSupplier = (supplier) => dispatch => {
  fetch('http://localhost:8000/productModel/Supplier/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(supplier)
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: ADD_SUPPLIER,
      payload: res
    })
  })
}

export const updateSupplier = (supplier) => dispatch => {
  const { id, ...data } = supplier

  fetch(`http://localhost:8000/productModel/Supplier/${id}/`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => dispatch({
    type: UPDATE_SUPPLIER,
    payload: res
  }))
  .catch(err => console.log(err))
}

export const deleteSupplier = (id) => dispatch => {
  fetch(`http://localhost:8000/productModel/Supplier/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_SUPPLIER,
    payload: id
  }))
  .catch(err => console.log(err))
}