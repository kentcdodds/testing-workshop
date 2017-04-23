// WORKSHOP_START
// let's sum some numbers with TDD
// WORKSHOP_END
// FINAL_START
export default sum

function sum(...number) {
  return number.reduce((s, n) => s + n, 0)
}
// FINAL_END
