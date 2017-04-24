export default arrayify
// WORKSHOP_START
// Here's where you'll write arrayify. Look at
// `api/src/routes/utils/arrayify.js` for instructions.

function arrayify() {
  // TODO don't type in here until you have a unit test first!
}
// WORKSHOP_END
// FINAL_START
function arrayify(thing = []) {
  return Array.isArray(thing) ? thing : [thing]
}
// FINAL_END
// COMMENT_START
/* eslint no-redeclare:0 */
// COMMENT_END
