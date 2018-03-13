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
  * [Unit tests](#unit-tests)
  * [Mocking dependencies](#mocking-dependencies)
  * [Test Object Factories](#test-object-factories)
  * [New features with Test-Driven Development](#new-features-with-test-driven-development)
  * [Integration tests](#integration-tests)
  * [Fixing bugs with Test-Driven Development](#fixing-bugs-with-test-driven-development)
  * [Write tests. Not too many. Mostly integration.](#write-tests-not-too-many-mostly-integration)
* [⚛️ Testing React and Web Applications:](#-testing-react-and-web-applications)
  * [Course Topics](#course-topics)
  * [What types of testing are there?](#what-types-of-testing-are-there-1)
  * [What's a test](#whats-a-test-1)
  * [Intro to Jest](#intro-to-jest)
  * [Configuring Jest](#configuring-jest)
  * [Introduction Enzyme](#introduction-enzyme)
    * [Utilities](#utilities)
  * [Unit testing components](#unit-testing-components)
  * [Effective Snapshot Testing](#effective-snapshot-testing)
  * [Integration testing pages](#integration-testing-pages)
  * [Configuring Cypress](#configuring-cypress)
  * [End-to-end testing](#end-to-end-testing)
  * [Write tests. Not too many. Mostly integration.](#write-tests-not-too-many-mostly-integration-1)
* [Shared Content](#shared-content)
  * [What types of testing are there?](#what-types-of-testing-are-there-2)
  * [Jest](#jest)
  * [Code Coverage](#code-coverage)
  * [Write tests. Not too many. Mostly integration.](#write-tests-not-too-many-mostly-integration-2)

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

See below in the shared content

### Brief intro to Jest

See section called ["Jest"](#jest) below in the shared content. Keep it brief.

### Unit tests

**Instruction**:

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

### Mocking dependencies

Mocking can be a little tricky, so we're going to approach it the same way we
approached learning what a testing framework is. In your terminal, change
directories to `other/whats-a-mock` and run `./jest`. This will start jest in
watch mode for the files here. Review the `thumb-war.js` and `utils.js` files
then open `__tests__/thumb-war.0.js` and follow the instructions there. Continue
through each of them. You'll find the solutions in the associated `.solution`
files.

**New Things**:

* `jest.mock` allows you to mock a dependency
* `jest.fn` allows you to create a function which keeps track of how it's called
* `jest.spyOn` allows you to wrap an object's function with a mock function.

Learn more about this from:
["But really, what is a JavaScript mock?"](https://tinyletter.com/kentcdodds/letters/but-really-what-is-a-javascript-mock)

**Takeaways**:

* Mocks are simply fake versions of code that allow us to get coverage on code
  that may otherwise be very difficult or impossible to test reliably.
* Mocking dependencies reduces confidence that our application works
* Jest has an amazing mocking library

Extra Credit (old exercise):

**Instruction**:

1. Open `server/src/utils/gist.js` and `server/src/utils/__tests__/gist.todo.js`
2. Implement an axios mock (inline with `jest.mock`)
3. Write the test and make assertions on the mock
4. Remove the inline mock and show the existing `__mocks__/axios.js` file

**Exercise**:

1. Open `server/src/utils/myjson.js` and `server/src/utils/__tests__/myjson.todo.js`
2. (Optionally) Implement an axios mock (inline with `jest.mock`)
3. Write the test and make assertions on the mock
4. Remove the inline mock use the existing `__mocks__/axios.js` file

### Test Object Factories

**New Things**:

* `beforeEach` allows you to run code before every test. There's also
  `afterEach`, but using that can be less optimal in some situations. It's
  generally better to use `beforeEach` to clean up and prepare the environment
  for your test so if it fails the environment remains as it is at the time of
  the failure which can help debugging why the failure occurred.

**Instruction**:

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

<!-- TODO: maybe make a simpler example -->

**Instruction**:

1. Open `server/src/controllers/__tests__/users.todo.js` and `server/src/controllers/users.todo.js`
2. Implement a `deleteUser` async function using TDD.

**Exercise**:

1. Open `server/src/controllers/__tests__/posts.todo.js` and `server/src/controllers/posts.todo.js`
2. Implement a `deletePost` async function using TDD.

**Takeaways**:

* Implement one part at a time to keep focused.
* Red, Green, Refactor (Don't forget the refactor!)
* Tests often have the basic shape of: Arrange, Act, Assert

### Integration tests

**New Things**:

* Because integration tests are higher level, they require a bit more setup.
  The `startServer` function accepts an options object. One option is the `port`
  that should be used to start the server. It's important to specify that
  because when running the tests in parallel, it's impossible to know exactly
  which port other tests are using.

**Instruction**:

1. Open `server/src/routes/__tests__/users.todo.js` and `server/src/controllers/users.js`
2. Implement requests to verify each of the users endpoints.

**Exercise**:

1. Open `server/src/routes/__tests__/posts.todo.js` and `server/src/controllers/posts.js`
2. Implement requests to verify each of the posts endpoints.

**Takeaways**:

* Multiple assertions within a single test is often more pragmatic/practical
  than splitting things up into multiple tests.
* Integration often takes a fair amount more effort/setup, and has more points
  of failure, but the payoff is much greater.

### Fixing bugs with Test-Driven Development

<!-- TODO: maybe make a simpler example -->

**New Things**:

**Instruction**:

1. Open `server/src/routes/users.js` and replace `../controllers/users` with
   `../controllers/users.bug.todo` (without anyone noticing?)
2. Run `npm run dev` and open the app. Note that the users endpoint is returning
   all of the user information (including the `salt` and `hash`).
3. Open `server/src/routes/__tests__/users.todo.js` and add a test that
   reproduces the bug (note: this is the same test the attendees need to
   implement in their exercise).
4. Open the `server/src/routes/users.js` file again and note that the users
   endpoint codepath goes through `server/src/controllers/users.bug.todo.js`.
5. Notice the bug in the users method.

**Exercise**:

1. Open `server/src/routes/__tests__/users.bug.todo.js` and
   `server/src/controllers/users.bug.todo.js`
2. Implement the test for the bug fix first, then fix the bug

**Takaways**:

* Notice that we can be more certain that our code changes fixed the bug because
  we reproduced the failure in our tests and our code changes fixed the tests.
* Notice also that after we've manually verified things work as well, we should
  hopefully never have to do so again because the test is in place to ensure it
  wont break without failing the test.
* By implementing this as a higher level test, it was easier to write a test to
  find the bug without knowing exactly where the bug was or what was causing it.

### Write tests. Not too many. Mostly integration.

See below in the shared content

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

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

### What's a test

> NOTE: This is duplicate content from the practices and principles workshop
> In this one however, folks should just watch the instructor go through things
> to make time for the rest of the content and not bore those who have already
> gone through this material.

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

### Intro to Jest

See section called ["Jest"](#jest) below in the shared content

### Configuring Jest

**New Things**:

* Code Coverage: A mechanism for us to understand how much of our code is run during the unit tests. 100% for libs, 70%ish for applications.

**Instruction**:

* Navigate to `./other/setup-jest/calculator`
* Go ahead and run `npm run dev` and open up `localhost:8080` to see the app
* `npm install --save-dev jest`
* Update the `test` script in `package.json` to `jest`
* Copy over `src/__tests__/utils.js` from `calculator.solution`
* Run `npm test` -- Fails due to syntax error with ES Modules which we have disabled for webpack
* Update `.babelrc.js` to have `modules: 'commonjs'` in test mode.
* Run `npm test` -- It works!
* Add `console.log(window)`
* Run `npm test` -- notice the huge window object is printed
* Create a `jest` object property in `package.json` and add `testEnvironment: 'node'`.
* Run `npm test` -- notice it fails with `window is not defined` which is what we want for node.

Now let's deal with CSS imports:

* Copy `src/__tests__/auto-scaling-text.simple.js` from `calculator.solution`
* Run `npm test` -- Fails because of the import of css
* Create `jest.config.js` and move config from `package.json` to that file.
* Add `moduleNameMapper` to match `.css`. Map it to `<rootDir>/test/style-mock.js`
* Create `style-mock.js` in `test` directory: `module.exports = {}`
* Run `npm test` -- The old error is gone! CSS importing is working
* Add a simple test: `ReactDOM.render(<AutoScalingText />, document.createElement('div'))`
* Run `npm test` -- Fails because `document` is not defined.
* Update `jest.config.js` to `testEnvironment: 'jsdom'`.
* Run `npm test` -- Passes!

And now for more React stuff:

* Copy `src/__tests__/auto-scaling-text.js` from `calculator.solution`
* `npm install --save-dev enzyme`
* Run `npm test` -- Fails because enzyme needs an adapter
* Run `npm install --save-dev enzyme-adapter-react-16`
* Add adapter code to the test
* Run `npm test` -- Works!

Let's improve the CSS imports a bit:

* Add `console.log(mount(<AutoScalingText />).html())` and notice there is no className because our style mock just returns an empty object for our css modules (I'm actually not sure why the style prop doesn't appear there... I guess React's not using the style attribute to apply those style properties?)
* `npm install --save-dev identity-obj-proxy`
* Add `moduleNameMapper` to `jest.config.js` that matches `.module.css` and maps to `identity-obj-proxy` (must come BEFORE the other one).
* Run `npm test` -- Shows the `class`!
* Remove the `console.log` because it's annoying.

Let's handle dynamic imports:

* Copy `src/__tests__/calculator.js` from `calculator.solution`
* Run `npm test` -- Fails due to syntax error on dynamic import
* `npm install --save-dev babel-plugin-dynamic-import-node`
* Update `.babelrc.js` to use `dynamic-import-node` when in tests
* Run `npm test` -- Fails because Enzyme is not configured
* Copy configuration from `auto-scaling-text.js`
* Run `npm test` -- Passes!

Let's improve framework configuration

* Create a file called `./test/setup-test-framework.js`
* Copy enzyme setup in there
* Replace setup with an import of that file in the test files
* Run `npm test` -- Passes!
* Update `jest.config.js` to have a `setupTestFrameworkScriptFile` that points to `./test/setup-test-framework.js`
* Remove the imports from the test files
* Run `npm test` -- Passes!

Ok! Now time for coverage!

* Update the `test` script in `package.json` to be `jest --coverage`
* Run `npm test` -- Passes and includes coverage!
* Open `./coverage/lcov-report/index.html` in a browser. Neat right!? It includes non-source files though
* Update `jest.config.js` with a `collectCoverageFrom` that is: `['**/src/**/*.js']`
* Run `npm test` -- Passes and includes coverage for only the files we care about.

Let's lock in our coverage!

* Update `jest.config.js` to have a `coverageThreshold` of 70% for statements, branches, functions, and lines.
* Run `npm test` -- Fails due to coverage threshold requirements
* Update `jest.config.js` to have a more reasonable `coverageThreshold`
* Run `npm test` -- Passes!

Let's turn on watch mode!

* Add a `test:watch` script to `package.json` and set it to `jest --watch`
* Run `npm run test:watch`
* Explore Jest's amazing watch mode

**Exercise**:

> No exercise here. It would be really boring I think...

**Takeaways**:

* Dependencies installed: `jest`, `enzyme`, `enzyme-adapter-react-16`, `identity-obj-proxy`, and `babel-plugin-dynamic-import-node`
* Get code coverage with: `jest --coverage`
* Watch mode with: `jest --watch`
* Configure jest with `jest.config.js`, `--config`, or `package.json` `jest` property:

  * `"testEnvironment": "jest-environment-node"` if you don't need `jsdom`
  * `collectCoverageFrom` to collect coverage numbers on your whole codebase (`coveragePathIgnorePatterns` can ignore some)
  * `coverageThresholds` to keep your coverage from falling

### Introduction Enzyme

These are two tools we'll use a lot when testing React applications. Here's a
list of things we'll need to cover for you to be successful for this workshop:

#### Utilities

* TODO

### Unit testing components

* TODO

### Effective Snapshot Testing

* TODO

### Integration testing pages

* TODO

### Configuring Cypress

* TODO

### End-to-end testing

**New Things**:

* The new script is `npm run test:e2e`
* Cypress uses a mocha-like framework for tests (`describe`, and `it`)
* Cypress uses a chai-like assertion library.
* Cypress has an internal queueing system for it's commands. Each command can
  yield a subject which allows you to execute commands on that subject. Think
  of the `cy` global as `user` and you're giving the user instructions of what
  to do. You pretty much chain everything from one command to the other unless
  you want to context switch to a new task.
  [learn more](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Subject-Management)

**Instruction**:

1. Open `cypress/e2e/auth.register.todo.js` and run `npm run test:e2e`
2. Run the tests `auth.register.todo.js`
3. Implement the register test

**Exercise**:

1. Open `cypress/e2e/auth.login.todo.js` and run `npm run test:e2e`
2. Run the tests `auth.login.todo.js`
3. Implement the login test

**Takeaways**:

* Once you've verified registration works in the UI, you should avoid needless
  test bottlenecks by using a utility to register a new user rather than
  registering a new user with the UI.
* E2E tests allow you to use your app like a user which gives you a LOT more
  confidence that things will work as expected when a user does use your app.
* Cypress has an AMAZING UX for writing E2E tests for web apps!

### Write tests. Not too many. Mostly integration.

See below in the shared content

---

## Shared Content

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

### Jest

**Instruction**:

1. Open `other/jest-expect/__tests__/expect-assertions.js`
2. Run `npm run test:expect`
3. Walk through the different assertions (should be pretty quick)

**Exercise**:

> I don't think there's time/need for exercises here

**Takeaways**:

* Reference all the assertions here: https://facebook.github.io/jest/docs/en/expect.html

### Code Coverage

Take a look at `other/coverage-example`. Look at the `example.js` file and
compare it to the `example.coverage.js` file. The one with coverage has been
instrumented with coverage meaning there's a variable set up for the file
and the code has been changed to include tracking of everywhere the code path
could go. Open up `coverage/lcov-report/index.html` in a browser to see the
report that this is intended to create.

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

### Write tests. Not too many. Mostly integration.

Basically [this talk](https://slides.com/kentcdodds/write-tests).
