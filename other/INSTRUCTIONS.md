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
  * [Course Topics](#course-topics)
  * [What's a test](#whats-a-test)
  * [What types of testing are there?](#what-types-of-testing-are-there)
  * [Brief intro to Jest](#brief-intro-to-jest)
  * [Unit tests](#unit-tests)
    * [Mocking dependencies](#mocking-dependencies)
  * [New features with Test-Driven Development](#new-features-with-test-driven-development)
  * [Integration tests (node)](#integration-tests-node)
  * [Fixing bugs with Test-Driven Development](#fixing-bugs-with-test-driven-development)
* [⚛️ Testing React and Web Applications:](#-testing-react-and-web-applications)
  * [Course Topics](#course-topics-1)
  * [What's a test](#whats-a-test-1)
  * [What types of testing are there?](#what-types-of-testing-are-there-1)
* [Configuring Jest](#configuring-jest)
* [Introduction to Jest and Enzyme](#introduction-to-jest-and-enzyme)

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

### Course Topics

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

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

### Brief intro to Jest

We're focusing on principles here so this introduction will be useful enough to
get you productive for the workshop, but brief enough so we can move on to the
main topics. Here's a list of things we'll need to cover for you to be
successful for this workshop:

* TODO

### Unit tests

#### Mocking dependencies

TODO: When it's useful, when it's not

### New features with Test-Driven Development

### Integration tests (node)

### Fixing bugs with Test-Driven Development

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

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

## Configuring Jest

TODO

## Introduction to Jest and Enzyme

These are two tools we'll use a lot when testing React applications. Here's a
list of things we'll need to cover for you to be successful for this workshop:

* TODO
