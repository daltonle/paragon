import {
  GET_CATALOGUES,
  ADD_CATALOGUE,
  DELETE_CATALOGUE,
  UPDATE_CATALOGUE
} from './types'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATALOGUES:
      return {
        ...state,
        data: action.payload
      }
    case ADD_CATALOGUE:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case DELETE_CATALOGUE:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    case UPDATE_CATALOGUE:
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