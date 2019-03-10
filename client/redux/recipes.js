import axios from 'axios'

// ACTION TYPES
const SET_RECIPES = 'SET_RECIPES'

// ACTION CREATORS
export const setResults = searchResults => ({
  type: SET_RECIPES,
  searchResults,
})

// THUNKS
export const fetchRecipes = () => async dispatch => {
  try {
    const searchResults = await axios.get(
      'http://api.yummly.com/v1/api/recipes?_app_id=95097531&_app_key=8098a13db96a63ae9a6ec9b49c7c8485&q=onion+soup&allowedCuisine[]=cuisine^cuisine-american'
    )
    console.log('search running')
    dispatch(setResults(searchResults.data))
  } catch (error) {
    console.error(error)
  }
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
