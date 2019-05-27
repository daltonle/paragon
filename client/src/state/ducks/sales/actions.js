import {
  GET_SALES,
  ADD_SALE_RECORD,
  UPDATE_SALE_RECORD,
  DELETE_SALE_RECORD
} from './types'

export const getSales = () => dispatch => {
  fetch('http://localhost:8000/sale/SaleRecord/', {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    const data = res.map(r => ({
      ...r,
      items: JSON.parse(r.items)
    }))
    dispatch({
      type: GET_SALES,
      payload: data
    })
  })
  .catch(err => console.log(err))
  
}

export const addSale = (sale) => dispatch => {
  const data = {
    ...sale,
    items: JSON.stringify(sale.items)
  }
  fetch('http://localhost:8000/sale/SaleRecord/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    const payload = {
      ...res,
      items: JSON.parse(res.items)
    }
    dispatch({
      type: ADD_SALE_RECORD,
      payload: payload
    })
  })
}

export const updateSale = (sale) => dispatch => {
  const data = {
    ...sale,
    items: JSON.stringify(sale.items)
  }

  fetch(`http://localhost:8000/sale/SaleRecord/${data.id}/`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    const payload = {
      ...res,
      items: JSON.parse(res.items)
    }
    dispatch({
      type: UPDATE_SALE_RECORD,
      payload: payload
    })
  })
  .catch(err => console.log(err))
}

export const deleteSale = (id) => dispatch => {
  fetch(`http://localhost:8000/sale/SaleRecord/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_SALE_RECORD,
    payload: id
  }))
  .catch(err => console.log(err))
}
