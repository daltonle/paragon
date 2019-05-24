import moment from 'moment'
import {
  GET_CUSTOMERS,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER
} from "./types"

export const getCustomers = () => dispatch => {
  fetch('http://localhost:8000/customer/', {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: GET_CUSTOMERS,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const addCustomer = (customer) => dispatch => {
  const { name, email, address, phone, hasCreditLine, creditLine, subjectInterests, modelTypeInterests, isMember, balance } = customer
  const data = {
    name,
    email,
    address,
    phone,
    hasCreditLine,
    creditLine: hasCreditLine ? creditLine : "",
    balance,
    isMember,
    joinDate: isMember ? moment().format() : null,
    subject: subjectInterests.map(s => ({ name: s.value })),
    type: modelTypeInterests.map(t => ({ name: t.value }))
  }

  fetch('http://localhost:8000/customer/', {
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
      type: ADD_CUSTOMER,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const deleteCustomer = (id) => dispatch => {
  fetch(`http://localhost:8000/customer/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_CUSTOMER,
    payload: id
  }))
  .catch(err => console.log(err))
}

export const updateCustomer = (customer) => dispatch => {
  const { name, email, address, phone, hasCreditLine, creditLine, subjectInterests, modelTypeInterests, isMember, balance } = customer
  const data = {
    name,
    email,
    address,
    phone,
    hasCreditLine,
    creditLine: hasCreditLine ? creditLine : "",
    balance,
    isMember,
    joinDate: isMember ? moment().format() : null,
    subject: subjectInterests.map(s => ({ name: s.value })),
    type: modelTypeInterests.map(t => ({ name: t.value }))
  }

  fetch(`http://localhost:8000/customer/${customer.id}/`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => dispatch({
    type: UPDATE_CUSTOMER,
    payload: res
  }))
  .catch(err => console.log(err))
}