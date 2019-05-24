import {
  GET_LOCATIONS
} from './types'

export const getLocations = () => dispatch => {
  fetch(`http://localhost:8000/locations/locations/`, {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: GET_LOCATIONS,
      payload: res
    })
  })
  .catch(err => console.log(err))
}