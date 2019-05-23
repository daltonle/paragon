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

export const addCustomer = (customer) => dispatch => {
  // fetch request

  const res = {
    id: 500000,
    name: customer.name,
    address: customer.address,
    phone: customer.phone,
    creditLine: customer.creditLine,
    isMember: customer.isMember,
    interests: [
      ...customer.subjectInterests,
      ...customer.modelTypeInterests
    ],
    joinDate: customer.isMember ? "" : moment().format("DD/MM/YYYY")
  }
  dispatch({
    type: ADD_CUSTOMER,
    payload: res
  })
}