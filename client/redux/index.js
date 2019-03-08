import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import recipes from './recipes'

const store = createStore(
  recipes,
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
