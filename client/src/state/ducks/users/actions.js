import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from './types'

export const getUsers = () => dispatch => {
  fetch('http://localhost:8000/account/users/', {
    headers: {
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: GET_USERS,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const addUser = (user) => dispatch => {
  const data = {
    ...user,
    profile: {
      ...user.profile,
      group: user.profile.group.value,
      location: user.profile.location.value
    }
  }

  fetch('http://localhost:8000/account/users/', {
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
      type: ADD_USER,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const updateUser = (user) => dispatch => {
  const data = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    password: user.password,
    repassword: user.repassword,
    profile: {
      ...user.profile,
      group: user.profile.group.value,
      location: user.profile.location.value
    }
  }
  console.log(data)

  fetch(`http://localhost:8000/account/users/${user.id}/`, {
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
      type: UPDATE_USER,
      payload: res
    })
  })
  .catch(err => console.log(err))
}

export const deleteUser = (id) => dispatch => {
  fetch(`http://localhost:8000/account/users/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
    }
  })
  .then(() => dispatch({
    type: DELETE_USER,
    payload: id
  }))
  .catch(err => console.log(err))
}