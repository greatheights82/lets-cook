import axios from 'axios'
import clarifaiApp from '../clarifai'
import Clarifai from 'clarifai'

// HELPER FUNCTIONS
const generateQueryString = ingredientArray => {
  if (ingredientArray.length === 1) {
    return `allowedIngredient[]=${ingredientArray[0]}`
  }

  const queryString = ingredientArray
    .reduce((accumulator, ingredient) => {
      return accumulator.concat(`allowedIngredient[]=${ingredient}&`)
    }, '')
    .slice(0, -1)
  return queryString
}

const responseParser = response => {
  const concepts = response.outputs[0].data.concepts

  return concepts.reduce((accumulator, nextConcept) => {
    if (nextConcept.value >= 0.55) {
      accumulator.push(nextConcept.name)
    }
    return accumulator
  }, [])
}

// ACTION TYPES
const SET_RECIPES = 'SET_RECIPES'
const RESET_RECIPES = 'RESET_RECIPES'
const ADD_SEARCH_TERM = 'ADD_SEARCH_TERM'
const REMOVE_SEARCH_TERM = 'REMOVE_SEARCH_TERM'
const RESET_SEARCH_TERM = 'RESET_SEARCH_TERM'
const BULK_ADD_SEARCH_TERM = 'BULK_ADD_SEARCH_TERM'

// ACTION CREATORS
export const setResults = searchResults => ({
  type: SET_RECIPES,
  searchResults,
})

export const resetRecipes = () => ({
  type: RESET_RECIPES,
})

export const addSearchTerm = newIngredient => ({
  type: ADD_SEARCH_TERM,
  newIngredient,
})

export const bulkAddSearchTerm = ingredientArray => ({
  type: BULK_ADD_SEARCH_TERM,
  ingredientArray,
})

export const removeSearchTerms = ingredientToRemove => ({
  type: REMOVE_SEARCH_TERM,
  ingredientToRemove,
})

export const resetSearchTerms = ingredientToRemove => ({
  type: RESET_SEARCH_TERM,
  ingredientToRemove,
})

// THUNKS
export const fetchRecipes = ingredientArray => async dispatch => {
  const queryString = generateQueryString(ingredientArray)
  try {
    const searchResults = await axios.get(
      `http://api.yummly.com/v1/api/recipes?_app_id=95097531&_app_key=8098a13db96a63ae9a6ec9b49c7c8485&${queryString}`
    )
    dispatch(setResults(searchResults.data))
  } catch (error) {
    console.error(error)
  }
}

export const handleImage = imageBits => async dispatch => {
  try {
    const response = await clarifaiApp.models.predict(Clarifai.FOOD_MODEL, {
      base64: imageBits,
    })
    dispatch(bulkAddSearchTerm(responseParser(response)))
  } catch (error) {
    console.error(error)
  }
}

export const resetState = () => dispatch => {
  dispatch(resetSearchTerms())
  dispatch(resetRecipes())
}

// REDUCER

export const recipes = (state = [], action) => {
  switch (action.type) {
    case SET_RECIPES:
      return action.searchResults.matches
    case RESET_RECIPES:
      return []
    default:
      return state
  }
}

const initialState = ['carrots', 'chicken', 'curry', 'potatoes', 'peas']

export const searchTerms = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH_TERM:
      return [...state, action.newIngredient.toLowerCase()]
    case BULK_ADD_SEARCH_TERM:
      return [...state, ...action.ingredientArray]
    case REMOVE_SEARCH_TERM:
      return [...state].filter(
        ingredient => ingredient !== action.ingredientToRemove
      )
    case RESET_RECIPES:
      return []
    default:
      return state
  }
}
