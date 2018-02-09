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
* [What's a test](#whats-a-test)
* [Configuring jest](#configuring-jest)
* [Unit tests](#unit-tests)
* [New features with Test-Driven Development](#new-features-with-test-driven-development)
* [Integration tests](#integration-tests)
* [Fixing bugs with Test-Driven Development](#fixing-bugs-with-test-driven-development)

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

## What's a test

Before we get into all the testing frameworks, let's learn about what a test
even is. In your terminal, change directories to `other/whats-a-test` and open
the `0.js` file in your editor. Follow the instructions there and continue
through to `5.js`. You'll find the solutions in the associated `.solution`
files.

Learn more about this from:
["But really, what is a JavaScript test?"](https://blog.kentcdodds.com/46fe5f3fad77)

## Configuring jest

TODO

## Unit tests

## New features with Test-Driven Development

## Integration tests

## Fixing bugs with Test-Driven Development
