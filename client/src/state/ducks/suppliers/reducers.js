import { 
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  DELETE_SUPPLIER,
  UPDATE_SUPPLIER
} from "./types"

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        data: action.payload
      }
    case ADD_SUPPLIER:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case DELETE_SUPPLIER:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    case UPDATE_SUPPLIER:
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