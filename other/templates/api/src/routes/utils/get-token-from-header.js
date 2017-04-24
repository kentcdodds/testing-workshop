export default getTokenFromHeader

// req is an express request object
// Here's an example:
// {
//   headers: {
//     authorization: 'Token blahblahblahblah.blahblahblah.blahblahblah',
//     // other headers
//   },
//   // other properties
// }
function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}
