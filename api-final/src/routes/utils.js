export {getTokenFromHeader, arrayify}

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

function arrayify(thing) {
  return Array.isArray(thing) ? thing : [thing]
}
