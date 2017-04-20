// COMMENT_START
/*
// COMMENT_END
// WORKSHOP_START
export {getTokenFromHeader}
// WORKSHOP_END
// COMMENT_START
*/
// COMMENT_END
// FINAL_START
export {getTokenFromHeader, arrayify}
// FINAL_END

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

// FINAL_START
function arrayify(thing) {
  return Array.isArray(thing) ? thing : [thing]
}
// FINAL_END
