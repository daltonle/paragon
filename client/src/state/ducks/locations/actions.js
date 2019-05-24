import {
  GET_LOCATIONS,
  ADD_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATION
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

export const addLocation = (location) => dispatch => {
  fetch(`http://localhost:8000/locations/locations/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(location)
  })
  .then(res => res.json())
  .then(res => dispatch({
    type: ADD_LOCATION,
    payload: res
  }))
  .catch(err => console.log(err))
}

export const updateLocation = (location) => dispatch => {
  const { id, ...data } = location

  fetch(`http://localhost:8000/locations/locations/${id}/`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => dispatch({
    type: UPDATE_LOCATION,
    payload: res
  }))
  .catch(err => console.log(err))
}

export const deleteLocation = (id) => dispatch => {
  fetch(`http://localhost:8000/locations/locations/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_LOCATION,
    payload: id
  }))
  .catch(err => console.log(err))
}