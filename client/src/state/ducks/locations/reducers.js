import { 
  GET_LOCATIONS,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION
} from "./types"

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        data: action.payload
      }
    case ADD_LOCATION:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case DELETE_LOCATION:
      let newData = [...state.data]
      newData.splice(newData.findIndex(d => d.id === action.payload), 1)
      return {
        ...state,
        data: newData
      }
    case UPDATE_LOCATION:
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