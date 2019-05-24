import {
  GET_MODELS
} from './types'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODELS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default reducer