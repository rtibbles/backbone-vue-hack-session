# Jest + Backbone/Vue Hack Session

## Getting started

```
git clone rtibbles/backbone-vue-hack-session
yarn install
yarn run test
```

## Running in watch mode

During exercises, run it in watch mode:

```
yarn run test:dev
```

Sometimes you will need to press <kbd>w</kbd> to see some options.

## Anatomy of the Repo

All of the Backbone views are in views.js, Models in models.js

Handlebars templates are in the templates folder.

Two snapshot tests for the Todo List app are in the test folder.

To convert these into Vue component, the first step is to turn the templates into the template
section of a Vue component. Most of the logic that is needed in the Backbone view itself may well
be unnecessary when mapping to a Vue component.

See if you can recreate the app using Vue (which this repo will also support).

An example of what the parallel tests for a Vue component approach might look like can be found
commented out in TodoListComponent.spec.js.
