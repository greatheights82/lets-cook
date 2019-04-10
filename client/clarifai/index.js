import { CLARIFAI_API_KEY } from '../../secrets'
const Clarifai = require('clarifai')

export const clarifaiApp = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY,
})

const responseParser = response => {
  const { concepts } = response.outputs.data
  return concepts.reduce((searchTerms, nextConcept) => {
    if (nextConcept.value >= 0.55) {
      searchTerms.push(nextConcept.name)
    }
  }, [])
}

export function processImage(imageBits) {
  clarifaiApp.models.predict(Clarifai.FOOD_MODEL, { base64: imageBits }).then(
    function(response) {
      responseParser(response)
    },
    function(err) {
      console.error(err)
    }
  )
}

export default clarifaiApp
