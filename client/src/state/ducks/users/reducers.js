import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from './types'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        data: action.payload
      }
    case ADD_USER:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case DELETE_USER:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    case UPDATE_USER:
      newData = [...state.data]
      newData[newData.findIndex(d => d.id === action.payload.id)] = action.payload
      return {
        ...state,
        data: newData
      }
    default:
      return state
  }
}

export default reducer