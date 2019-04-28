import { 
  GET_CUSTOMERS
} from "./types"

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default reducer