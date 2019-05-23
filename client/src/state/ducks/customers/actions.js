import moment from 'moment'
import {
  GET_CUSTOMERS,
  ADD_CUSTOMER
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

export const addCustomer = (customer, resolve, reject) => dispatch => {
  const { name, email, address, phone, hasCreditLine, creditLine, subjectInterests, modelTypeInterests, isMember} = customer
  const data = {
    name,
    email,
    address,
    phone,
    hasCreditLine,
    creditLine: hasCreditLine ? creditLine : "",
    isMember,
    joinDate: isMember ? moment().format() : null,
    subject: subjectInterests.map(s => ({ name: s.value })),
    type: modelTypeInterests.map(t => ({ name: t.value }))
  }

  console.log(JSON.stringify(data))

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
    resolve()
  })
  .catch(err => {
    console.log(err)
    reject("Something went wrong.")
  })
}