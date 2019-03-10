import axios from 'axios'

// ACTION TYPES
const SET_RECIPES = 'SET_RECIPES'

// ACTION CREATORS
export const setResults = searchResults => ({
  type: SET_RECIPES,
  searchResults,
})

// THUNKS
export const fetchRecipes = ingredientArray => async dispatch => {
  const queryString = generateQueryString(ingredientArray)
  try {
    const searchResults = await axios.get(
      `http://api.yummly.com/v1/api/recipes?_app_id=95097531&_app_key=8098a13db96a63ae9a6ec9b49c7c8485&${queryString}`
    )
    console.log('search running')
    dispatch(setResults(searchResults.data))
  } catch (error) {
    console.error(error)
  }
}

// HELPER FUNCTIONS
const generateQueryString = ingredientArray => {
  if (ingredientArray.length === 1) {
    return `allowedIngredient[]=${ingredientArray[0]}`
  }

  const queryString = ingredientArray.reduce((accumulator, ingredient) => {
    return accumulator.concat(`allowedIngredient[]=${ingredient}&`)
  }, '')
  console.log('ingredient query', queryString)
  return queryString
}

// REDUCER

export const recipes = (state = [], action) => {
  switch (action.type) {
    case SET_RECIPES:
      return action.searchResults.matches
    default:
      return state
  }
}
export default recipes
