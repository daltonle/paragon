import { 
  GET_CUSTOMERS,
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
    case UPDATE_CUSTOMER:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    default:
      return state
  }
}

export default reducer