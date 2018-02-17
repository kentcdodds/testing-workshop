# Instructions

This workshop is intended to be delivered in a workshop setting by an instructor
either in person or via video recording. However, I'll try to document the
steps/outline as best I can in this instructions document so you can try to work
through it on your own if you like.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Setup](#setup)
  * [Learning the codebase](#learning-the-codebase)
* [🕴 Testing Practices and Principles:](#-testing-practices-and-principles)
  * [What's a test](#whats-a-test)
  * [What types of testing are there?](#what-types-of-testing-are-there)
  * [Brief intro to Jest](#brief-intro-to-jest)
    * [Code Coverage](#code-coverage)
  * [Unit tests](#unit-tests)
    * [Mocking dependencies](#mocking-dependencies)
  * [Test Object Factories](#test-object-factories)
  * [New features with Test-Driven Development](#new-features-with-test-driven-development)
  * [Integration tests](#integration-tests)
  * [Fixing bugs with Test-Driven Development](#fixing-bugs-with-test-driven-development)
  * [Write tests. Not too many. Mostly integration.](#write-tests-not-too-many-mostly-integration)
* [⚛️ Testing React and Web Applications:](#-testing-react-and-web-applications)
  * [Course Topics](#course-topics)
  * [What's a test](#whats-a-test-1)
  * [What types of testing are there?](#what-types-of-testing-are-there-1)
  * [Configuring Jest](#configuring-jest)
    * [Code Coverage](#code-coverage-1)
  * [Introduction to Jest and Enzyme](#introduction-to-jest-and-enzyme)
    * [Assertions](#assertions)
    * [Utilities](#utilities)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Follow the instructions in the `README.md` file to set up the project.

### Learning the codebase

There are 3 places where you'll find code that runs in production:

1. client - runs in the browser. Entry at: `client/src/index.js`
2. server - runs on the server. Entry at: `server/index.js`
3. shared - runs in both. Entry at: `shared/index.js`

To get things running, you'll use [`npm scripts`](https://docs.npmjs.com/misc/scripts)
You can run `npm run` to get a list of the available scripts. There are several
scripts in there that wont be entirely relevant to you during the workshop.
The main ones you should care about are:

1. `npm run dev` - runs the dev server so you can work on and use the app in development
2. `npm run test` - runs the unit and integration tests with jest in watch mode.
3. `npm run test:e2e` - runs the e2e tests with cypress in dev mode.

## 🕴 Testing Practices and Principles:

**Course Topics**

* Fundamentals behind tests and testing frameworks
* Distinctions of different forms of testing
* How to write Unit tests
* How to write Integration tests
* When and how to mock dependencies
* How to use test driven development to write new features
* How to use test driven development to find and fix bugs
* Core principles of testing to ensure your tests give you the confidence you need

### What's a test

Before we get into all the testing frameworks, let's learn about what a test
even is. In your terminal, change directories to `other/whats-a-test` and open
the `0.js` file in your editor. Follow the instructions there and continue
through to `5.js`. You'll find the solutions in the associated `.solution`
files.

Learn more about this from:
["But really, what is a JavaScript test?"](https://blog.kentcdodds.com/46fe5f3fad77)

**New Things**:

* Assertion: A way for you to specify how things should be. Will throw an error if they are not that way, this is what fails the test.

**Takeaways**:

* Tests are simply code that runs other code and performs "assertions"
* Testing frameworks abstract this away for us to be more productive in writing tests.

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

### Brief intro to Jest

We're focusing on principles here so this introduction will be useful enough to
get you productive for the workshop, but brief enough so we can move on to the
main topics. Here's a list of things we'll need to cover for you to be
successful for this workshop
([full list of assertions here](https://facebook.github.io/jest/docs/en/expect.html)):

* [`toBe`](https://facebook.github.io/jest/docs/en/expect.html#tobevalue) is
  basically `===`: `expect(1).toBe(1)`
* [`toEqual`](https://facebook.github.io/jest/docs/en/expect.html#toequalvalue)
  is like [`lodash.isEqual`](https://lodash.com/docs/4.17.4#isEqual):
  `expect({a: {b: 'c'}, d: 'e'}).toEqual({a: {b: 'c'}, d: 'e'})`
* [`toMatchObject`](https://facebook.github.io/jest/docs/en/expect.html#tomatchobjectobject)
  is similar to `toEqual`, but for partial equality:
  `expect({a: {b: 'c'}, d: 'e'}).toEqual({d: 'e'})`
* [`toHaveBeenCalledTimes`](https://facebook.github.io/jest/docs/en/expect.html#tohavebeencalledtimesnumber)
  is a jest mock function (`jest.fn()`) assertion:
  `expect(mockFn).toHaveBeenCalledTimes(0)`
* [`toHaveBeenCalledWith`](https://facebook.github.io/jest/docs/en/expect.html#tohavebeencalledwitharg1-arg2-)
  is a jest mock function (`jest.fn()`) assertion. The arguments correspond to
  what you expect it to have been called with:
  `expect(mockFn).toHaveBeenCalledWith(arg1, arg2)`
* [`toBeGreaterThan`](https://facebook.github.io/jest/docs/en/expect.html#tobegreaterthannumber)
  is a number assertion: `expect(1).toBeGreaterThan(0)`
* [`toBeFalsy`](https://facebook.github.io/jest/docs/en/expect.html#tobefalsy)
  is a JavaScript falsy assertion: `expect(0).toBeFalsy()`, `expect(null).toBeFalsy()`

For `toEqual`, `toMatchObject`, and `toHaveBeenCalledWith`, you can match a
schema using some utilities available on the `expect` global. For example:

```javascript
const birthday = {
  day: 18,
  month: 10,
  year: 1988,
  meta: {display: 'Oct 18th, 1988'},
}
const schema = {
  day: expect.any(Number),
  month: expect.any(Number),
  year: expect.any(Number),
  meta: {display: expect.stringContaining('1988')},
  // there's also expect.arrayContaining, or expect.objectContaining
}
expect(birthday).toEqual(schema)
```

You can negate any assertion by prefixing it with `.not`. For example:
`expect(2).not.toBe(3)`

If you would like to get more fine-grained assertions on mock function
arguments, you can get them from the `.mock.calls` property on the mock
function:

```javascript
const myFn = jest.fn()
myFn('first', {second: 'val'})
const calls = myFn.mock.calls
const firstCall = calls[0]
const firstArg = firstCall[0]
const secondArg = firstCall[1]

expect(firstArg).toBe('first')
expect(secondArg).toEqual({second: 'val'})
```

You may also destructure those args in a single line:

```javascript
const [[firstArg, secondArg]] = myFn.mock.calls
```

#### Code Coverage

Take a look at `other/coverage-example`. Look at the `example.js` file and
compare it to the `example.coverage.js` file. The one with coverage has been
instrumented with coverage meaning there's a variable set up for the file
and the code has been changed to include tracking of everywhere the code path
could go.

**New Things**:

* Branch: A branch in the code path. For example: `if`, `else`, `ternary`, `switch`.
* Statement: A syntax expression intended to be executed: Function call and/or assignment
* Lines: [Basically irrelevant now](https://github.com/gotwarlost/istanbul/issues/639)
* Functions: Whether or not a function was ever invoked

**Takeaways**:

* Coverage is a useful metric as it shows you where code has not verifiably been
  run during tests.
* This metric is just an indicator and should not be misinterpreted as whether
  the logic is correct or the code will never break.
* You can get distracted by trying to achieve 100% code coverage when your time
  could be better spent elsewhere. Often trying to achieve 100% code coverage
  can result in doing weird things that make your tests brittle.

### Unit tests

**Demo**:

1. Open `server/src/utils/__tests__/auth.todo.js` and `server/src/utils/auth.js`
2. Implement tests for `isPasswordAllowed`

**Exercise**:

1. Stay in `server/src/utils/__tests__/auth.todo.js` and `server/src/utils/auth.js`
2. Implement a single test for `userToJSON`

**Takeaways**:

* Interact with the unit in the same way you would in the actual code. Then
  assert on the resulting value or changes in state.
* Pure functions are the easiest to unit test
* Test for use cases rather than for code coverage
* Using variables to be explicit about relationships is useful (when kept simple).

#### Mocking dependencies

**New Things**:

* `jest.mock` allows you to mock a dependency
* `jest.fn` allows you to create a function which keeps track of how it's called
* `jest.spyOn` allows you to wrap an object's function with a mock function.

**Demo**:

1. Open `server/src/utils/gist.js` and `server/src/utils/__tests__/gist.todo.js`
2. Implement an axios mock (inline with `jest.mock`)
3. Write the test and make assertions on the mock
4. Remove the inline mock and show the existing `__mocks__/axios.js` file

**Exercise**:

1. Open `server/src/utils/myjson.js` and `server/src/utils/__tests__/myjson.todo.js`
2. (Optionally) Implement an axios mock (inline with `jest.mock`)
3. Write the test and make assertions on the mock
4. Remove the inline mock use the existing `__mocks__/axios.js` file

**Takeaways**:

* Mocking dependencies reduces confidence that our application works
* Mocking dependencies is sometimes the _only_ way to write reliable tests
* Jest has an amazing mocking library

### Test Object Factories

**Demo**:

1. Open `server/src/controllers/__tests__/users.todo.js` and `server/src/controllers/users.todo.js`
2. Implement a test for `getUsers` and `getUser`
3. Demonstrate the test object factory pattern by extracting the common `req`, and `res` setup to a `setup` function

**Exercise**:

> This one's optional based on how much time is available...

1. Open `server/src/controllers/__tests__/posts.todo.js` and `server/src/controllers/posts.todo.js`
2. Implement a test for `getPosts` and `getPost` using test object factories

**Takeaways**:

* Multiple tests that look basically the same can be hard to maintain/understand
* Using a test object factory allows you to abstract some common code and leave
  only the code that's relevant for the test itself.

### New features with Test-Driven Development

**Demo**:

1. Open `server/src/controllers/__tests__/users.todo.js` and `server/src/controllers/users.todo.js`
2. Implement a `deleteUser` async function using TDD.

**Exercise**:

1. Open `server/src/controllers/__tests__/posts.todo.js` and `server/src/controllers/posts.todo.js`
2. Implement a `deletePost` async function using TDD.

**Takeaways**:

* Implement one part at a time to keep focused.
* Red, Green, Refactor (Don't forget the refactor!)

### Integration tests

TODO

**Takeaways**:

* Tests often have the basic shape of: Arrange, Act, Assert

### Fixing bugs with Test-Driven Development

TODO

### Write tests. Not too many. Mostly integration.

Basically [this talk](https://slides.com/kentcdodds/write-tests).

---

## ⚛️ Testing React and Web Applications:

### Course Topics

* Fundamentals of what a test is and what role testing frameworks play
* Configure Jest for a client-side React project
* What Code Coverage is and how to properly use that metric
* Write unit tests for JavaScript utilities and React components
* What snapshot testing is and how to use it effectively
* Write integration tests for a React application
* Configure Cypress for a web application
* Write E2E (end-to-end) tests with Cypress

### What's a test

Before we get into all the testing frameworks, let's learn about what a test
even is. In your terminal, change directories to `other/whats-a-test` and open
the `0.js` file in your editor. Follow the instructions there and continue
through to `5.js`. You'll find the solutions in the associated `.solution`
files.

Learn more about this from:
["But really, what is a JavaScript test?"](https://blog.kentcdodds.com/46fe5f3fad77)

**New Things**:

* Assertion: A way for you to specify how things should be. Will throw an error if they are not that way, this is what fails the test.

**Takeaways**:

* Tests are simply code that runs other code and performs "assertions"
* Testing frameworks abstract this away for us to be more productive in writing tests

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

### Configuring Jest

**New Things**:

* Code Coverage: A mechanism for us to understand how much of our code is run during the unit tests. 100% for libs, 70%ish for applications.

**Takeaways**:

* One dependency! `jest`
* Get code coverage with: `jest --coverage`
* Watch mode with: `jest --watch`
* Configure jest with `jest.config.js`, `--config`, or `package.json` `jest` property:
  * `"testEnvironment": "jest-environment-node"` if you don't need `jsdom`
  * `collectCoverageFrom` to collect coverage numbers on your whole codebase
  * `coverageThresholds` to keep your coverage from falling

#### Code Coverage

Take a look at `other/coverage-example`. Look at the `example.js` file and
compare it to the `example.coverage.js` file. The one with coverage has been
instrumented with coverage meaning there's a variable set up for the file
and the code has been changed to include tracking of everywhere the code path
could go.

**New Things**:

* Branch: A branch in the code path. For example: `if`, `else`, `ternary`, `switch`.
* Statement: A syntax expression intended to be executed: Function call and/or assignment
* Lines: [Basically irrelevant now](https://github.com/gotwarlost/istanbul/issues/639)
* Functions: Whether or not a function was ever invoked

**Takeaways**:

* Coverage is a useful metric as it shows you where code has not verifiably been
  run during tests.
* This metric is just an indicator and should not be misinterpreted as whether
  the logic is correct or the code will never break.
* You can get distracted by trying to achieve 100% code coverage when your time
  could be better spent elsewhere. Often trying to achieve 100% code coverage
  can result in doing weird things that make your tests brittle.

### Introduction to Jest and Enzyme

These are two tools we'll use a lot when testing React applications. Here's a
list of things we'll need to cover for you to be successful for this workshop:

#### Assertions

* TODO

#### Utilities
