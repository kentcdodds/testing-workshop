<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

* [server integration tests](#server-integration-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# server integration tests

These tests each spin up the full server on a specific port and fires regular
HTTP requests (using the `axios` library) to the associated endpoints. In some
cases, the tests interacts directly with the database for its setup.
