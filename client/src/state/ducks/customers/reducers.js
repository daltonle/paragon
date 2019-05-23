import { 
  GET_CUSTOMERS,
  ADD_CUSTOMER,
  DELETE_CUSTOMER
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
    default:
      return state
  }
}

export default reducer