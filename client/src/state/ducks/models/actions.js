import {
  GET_MODELS
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