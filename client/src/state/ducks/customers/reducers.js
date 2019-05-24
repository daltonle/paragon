import { 
  GET_CUSTOMERS,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER
} from "./types"

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        data: action.payload
      }
    case ADD_CUSTOMER:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case DELETE_CUSTOMER:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    case UPDATE_CUSTOMER:
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