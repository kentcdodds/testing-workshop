export default getAge

// WORKSHOP_START
function getAge(person) {
  if (person.age) {
    return person.age
  }
  return null
}
// WORKSHOP_END

// FINAL_START
function getAge({age = null}) {
  return age
}
// FINAL_END
