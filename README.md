# JOKES APP
[DEMO](https://andriimelnyq.github.io/jokes-app/)

This application shows a list of jokes and allows users to interact with them.

1. When the main page is loaded, the initial set of jokes is retrieved. If the user has previously created jokes, those are added first, and the remaining slots are filled with jokes obtained from a request to the server.
2. By clicking the "Load More" button, an additional set of 10 jokes is loaded. The request is made repeatedly until all the newly loaded jokes are unique and not already present in the existing set.
3. Clicking the "Add" button adds a new joke to the collection. The newly added joke is also stored in the local storage.
4. Clicking the "Delete" button removes a joke from the collection.
5. Clicking the "Refresh" button updates the displayed joke with a new one.

Throughout these actions, a Loader is shown to indicate that requests to the server are in progress.

### Used technologies
- React, Typescript, Redux (Redux Toolkit).
- [REST API](https://official-joke-api.appspot.com).
- JS.
- CSS + SCSS + BEM.
- HTML.
- MaterialUI.

### Instructions
For run it on your machine: just `fork` this repo. Then `clone` it to your computer and run `npm install` (npm i). After use `npm start`.
