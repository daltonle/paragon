import { ADD_ORDER, GET_ORDERS } from './types'

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        data: action.payload
      }
    case ADD_ORDER:
      return{
        ...state,
        data: [ ...state.data, action.payload ]
      }
    default:
      return state
  }
}

export default reducer