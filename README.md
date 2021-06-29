# mtk-test

## Introduction

Project done using *[VueJS](https://vuejs.org/)* and *[VueX](https://vuex.vuejs.org/)* is used for state management. 

*[Vue-test-utils](https://vue-test-utils.vuejs.org/)* for unit testing. (Jest based).

Any questions, please feel free to reach me.

## Considerations/improvements

Improvements could be made in several areas of the app, depending on the time and how it would scale.

### CSS/SASS/assets

Typography could be defined in a central file for specific HTML elements as H1's, H2's, etc, if the design was consistent, which would help in terms of scalability.

No breakpoints for mobile, although the list items have a certain fluidity which allows them to break into different rows according to width

Central files for CSS reset (Erki Meyer's), fonts and global variables.

More SASS variables could be created according to possible breakdown of the designs.

Assets such as images and fonts could probably do with some optimisation, but as for an example project should work fine.

### State Management

Since the current example is quite straightforward, we didn't need to separate the store by modules although in terms scalability, it would help to go into that direction.

**state**, **getters**, **actions** and **mutations** separated per file for better management.

### Data loading and management

Data is loaded from the mocked data provided on **/api/mockData.js** and abstracted by the method on **/api/api.js**. On this method, check the code comment to test error state. Also on this method we would replace the returned mocked data by an AXIOS call and no further changes would be needed on the code to use a live api.

### Views

**App.vue** as the main entry point for the app, where we have a global loader. **SearchPageView** is the dedicated view for the main route of the app.

### Components

Created a couple of components to showcase possible drilldown of logical elements. When scaling this can be refined if needed.
To handle the "favourites" persistence, this particular data is stored in LocalStorage.

### Testing

Added unit testing to all of the project. Current coverage for % statements is around **95.7%**. A couple of places couldn't be properly unit tested due to the debounce method which I couldn't test.

Project was initialized with E2E testing with Cypress but no tests where written for the effect.


## Project setup
The project runs on **node** `v12.4.0` and **npm** `v6.9.0`. For installation run:

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
