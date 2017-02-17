import faker from 'faker'

export {commonProps}

function commonProps(oldestDate = faker.date.past(5)) {
  const createdAt = faker.date.between(oldestDate, new Date())
  return {
    updatedAt: faker.date.between(createdAt, new Date()).toISOString(),
    createdAt: createdAt.toISOString(),
  }
}
