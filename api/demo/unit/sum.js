export default sum

function sum(...number) {
  return number.reduce((s, n) => s + n, 0)
}
