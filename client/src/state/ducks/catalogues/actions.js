import {
  GET_CATALOGUES,
  ADD_CATALOGUE,
  UPDATE_CATALOGUE,
  DELETE_CATALOGUE
} from './types'

export const getCatalogues = () => dispatch => {
  fetch('http://localhost:8000/productModel/SupplierCatalogue/', {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: GET_CATALOGUES,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const addCatalogue = (catalogue) => dispatch => {
  const data = {
    supplier_id: catalogue.supplier_id.value,
    pModel_id: catalogue.pModel_id.value,
    price: catalogue.price
  }

  fetch('http://localhost:8000/productModel/SupplierCatalogue/', {
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
      type: ADD_CATALOGUE,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const updateCatalogue = (catalogue) => dispatch => {
  const data = {
    supplier_id: catalogue.supplier_id.value,
    pModel_id: catalogue.pModel_id.value,
    price: catalogue.price
  }

  fetch(`http://localhost:8000/productModel/SupplierCatalogue/${catalogue.id}/`, {
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
      type: UPDATE_CATALOGUE,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const deleteCatalogue = (id) => dispatch => {
  fetch(`http://localhost:8000/productModel/SupplierCatalogue/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_CATALOGUE,
    payload: id
  }))
  .catch(err => console.log(err))
}