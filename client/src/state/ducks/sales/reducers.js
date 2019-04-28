import {
  GET_SALES
} from './types'

const initialState = { }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default reducer