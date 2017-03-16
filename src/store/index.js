import state from './state'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const middleware = applyMiddleware(thunkMiddleware)

export const store = createStore(
  rootReducer,
  state,
  middleware
)