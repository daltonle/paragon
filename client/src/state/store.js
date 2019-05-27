import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as reducers from './ducks'
import userReducer from './ducks/user/reducers'

const persistConfig = {
  key: 'user',
  storage
}

const rootReducer = combineReducers({
  ...reducers,
  user: persistReducer(persistConfig, userReducer)
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer, 
  initialState, 
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
  )
)

export const persistor = persistStore(store)

export default store