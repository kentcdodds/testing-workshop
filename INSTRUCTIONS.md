# Instructions

> This is a work in progress, but I think it'll be much easier for you to know what to do to have it written out!

## API Unit Tests

- Run `npm start api.unit` to run the tests in watch mode
- Relevant files:
  - You'll write your tests in: `api/src/routes/__tests__/utils.js`
  - The source code you're testing is: `api/src/routes/utils.js`
  - The demo is in: `api-final/demo/unit/`
  - The solution is in: `api-final/src/routes/`

### TDD a new feature

Setup is the same as above!

### Fix the bug

- Run `npm start api.unit` to run the tests in watch mode
- Relevant files:
  - You'll write your tests in: `api/src/models/__tests__/user.js`
  - The bug is in: `api/src/models/user.js`
  - The solution is in: `api-final/src/models/`

> Remember to first find the bug, reproduce it with a test, then fix the bug.
> That order is important!

## API Integration Tests

- Run `npm start api.integration` to run the tests in watch mode
- Relevant files:
  - You'll write your tests in: `api/tests/integration/articles.test.js`
  - The article's routes are defined in: `api/src/routes/api/articles.js`
  - The demo is in: `api-final/demo/integration/`
  - The solution is in: `api-final/tests/integration/`

## Client Unit Tests

- Run `npm start client.unit` to run the tests in watch mode
- Relevant files:
  - You'll write your tests in: `src/reducers/__tests__/` and `src/screens/__tests__`
  - The source code you're testing is next to those folders.
  - The demo is in: `client-final/demo/unit/`
  - The solution is in: `client-final/tests/unit/`

## Client Integration Tests

- Run `npm start client.integration` to run the tests in watch mode
- Relevant files:
  - You'll write your tests in: `client/tests/integration/login.test.js`
  - The login component is: `client/src/screens/login.js`
  - The demo is: `client-final/tests/integration/register.test.js`
  - The solution is: `client-final/tests/integration/login.test.js`

## End to End Tests

- Run `npm start e2e.dev` to run the tests in dev mode
- Relevant files:
  - You'll write your tests in: `cypress/e2e/users_spec.js`
  - You may find: `cypress/e2e/utils.js` useful
