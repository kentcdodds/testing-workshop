# Schedule

Just something to help me make sure that I cover everything I want to in the right order.

## Getting Started

- Introductions
  - Setup expectations
  - Go over `workshop-info.md`

### The most basic test

> This is just a hook because people are going to go for a while without touching
> the keyboard and that can be frustrating, so we'll start out with something
> pretty simple.

- Open `other/start.html` in the browser.

**Takeaways**:

- Tests are simply code that runs other code and performs "assertions"
- Testing frameworks abstract this away for us to be more productive in writing tests.

### Further Introduction

- Why test?
- Introduce Application

### Introduce Jest

- Setting up Jest

**New Terms**:

- Assertion: A way for you to specify how things should be. Will throw an error if they are not that way, this is what fails the test.
- Code Coverage: A mechanism for us to understand how much of our code is run during the unit tests. 100% for libs, 75%ish for applications.

**Takeaways**:

- Dependencies: `jest`, `babel-core`, `babel-preset-env`.
- Get code coverage with: `jest --coverage`
- Watch mode with: `jest --watch`
- Configure jest with `--config` or `package.json` `jest` property:
  - `"testEnvironment": "jest-environment-node"` if you don't need `jsdom`
  - `collectCoverageFrom` to collect coverage numbers on your whole codebase
  - `coverageThresholds` to keep your coverage from falling

## TAKE A BREAK!

## Unit Testing

### On existing code

#### `make-me-a-sandwich` Demo

- Run `nps api.demo.unit`

**Takeaways**:
  - Pure functions === easiest to test: compose your application of these as much as possible
  - 

#### `get-token-from-header` Exercise

- Run `nps api.unit`

### Test Driven Development

#### `sum` Demo

- Run `nps api.demo.unit`

#### `arrayify` Exercise

- Run `nps api.unit`

### Fixing Bugs

#### `get-age` Demo

- Run `nps api.demo.unit`

#### `user` Exercise

- Run `nps api.unit`
- Bug is in `api/src/models/user`
- Test is in `api/src/models/__tests__/user`

## TAKE A BREAK!
