import { SET_USER } from './types'

export const setUser = (user) => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  })
}