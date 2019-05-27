import {
  GET_ORDERS,
  ADD_ORDER
} from './types'
import moment from 'moment'

export const getOrders = () => dispatch => {
  fetch('http://localhost:8000/productModel/Order/', {
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
      type: GET_ORDERS,
      payload: data
    })
  })
  .catch(err => console.log(err))
}

export const addOrder = (order) => dispatch => {
  const data = {
    ...order,
    items: JSON.stringify(order.items),
    time: moment().format()
  }
  fetch('http://localhost:8000/productModel/Order/', {
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
      type: ADD_ORDER,
      payload: payload
    })
  })
}