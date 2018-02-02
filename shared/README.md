# til-shared

This is installed into the `client` and `server` directories as an actual
dependency. This is accomplished by symlinking this directory into their
respective `other` directories, and then they each install it as a file located
in their `./other/shared` directories. This happens in the `install` step of
the `setup` script.

This is done mostly for the server to be able to be deployed on its own.

There's not a lot of code shared here (and mostly it's just for tests), but I
thought it would be fun to show one way to accomplish this kind of code reuse.

One important note is that these files are not transpiled at any point. So it's
a good idea to avoid using features not available in Node8 :)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
