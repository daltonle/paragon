import {
  GET_SALES
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

