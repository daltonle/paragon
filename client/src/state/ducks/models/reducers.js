import {
  GET_MODELS,
  ADD_MODEL,
  DELETE_MODEL,
  UPDATE_MODEL
} from './types'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODELS:
      return {
        ...state,
        data: action.payload
      }
    case ADD_MODEL:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case DELETE_MODEL:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    case UPDATE_MODEL:
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