import React from 'react'

export const login = (values) => {
  if (values.username === 'timothy' && values.password === 'timtam') {
    sessionStorage.setItem("loggedIn", "true")
    return true
  }
  else return false
}