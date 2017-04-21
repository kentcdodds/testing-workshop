export {makeMeASandwich, sum}

function makeMeASandwich(req) {
  if (typeof req.query.sandwich !== 'string') {
    return null
  }
  return req.query.sandwich
}

function sum(...numbers) {
  return numbers.reduce((acc, n) => n + acc, 0)
}
