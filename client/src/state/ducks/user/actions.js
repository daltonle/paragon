import { SET_USER } from './types'

export const setUser = (user) => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  })
}

export const updateProfile = (user) => dispatch => {
  console.log("here")
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
      type: SET_USER,
      payload: res
    })
  })
  .catch(err => console.log(err))

  const { newPassword, reNewPassword } = user
  if (newPassword) {
    fetch(`http://localhost:8000/account/users/${user.id}/change_password/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem("ParagonToken")}`
      },
      body: JSON.stringify({
        current_password: user.password,
        password: newPassword,
        repassword: reNewPassword
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res
      })
    })
    .catch(err => console.log(err))
  }
}