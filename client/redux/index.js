import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { recipes, searchTerms } from './recipes'
// import thunk from 'redux-thunk'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const reducer = combineReducers({
  recipes,
  searchTerms,
})

const store = createStore(reducer, middleware)

export default store
