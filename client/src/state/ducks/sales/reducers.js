import {
  GET_SALES,
  ADD_SALE_RECORD,
  UPDATE_SALE_RECORD,
  DELETE_SALE_RECORD
} from './types'

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        data: action.payload
      }
    case ADD_SALE_RECORD:
      return{
        ...state,
        data: [ ...state.data, action.payload ]
      }
    case UPDATE_SALE_RECORD:
      newData = [...state.data]
      newData[newData.findIndex(d => d.id === action.payload.id)] = action.payload
      return {
        ...state,
        data: newData
      }
    case DELETE_SALE_RECORD:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    default:
      return state
  }
}

export default reducer