export {makeMeASandwich}

function makeMeASandwich(req) {
  if (typeof req.query.sandwich !== 'string') {
    return null
  }
  return req.query.sandwich
}
