const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImU1MWEwOGNmLTY2ZGMtNGE2NS04Y2QwLTY0MDIyOGNhMGU1NS0xNjYyOTIxNTQxNjYxIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiYWU3ZGZkNzItZGU4MC00MWM4LWExOWUtNDFjZjcxYzNmOTYxIiwidHlwZSI6InQifQ.jUj_Cp7HLUhOjFBn7e5-eSaEZr_K2GTSGEXmDEO0VJc'

cypress.run({
   browser: 'chrome',
   baseUrl: 'https://stage.qtruck.com.br',
   env: {
    apiUrl: 'https://stage.api.qtruck.com.br'
   }
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})