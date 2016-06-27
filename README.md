# Twitter image filter
## Description
Purpose of this app is pure demonstration of migration from just React to React+Redux.
You can create filters containing tags. These filters are saved inside localStorage. 
These filters can be used for searching in twitter images feed.

## Stack
- react
- react-router
- webpack
- nodeJS
- babel (ES6)
- express (for HMR)
 
##  Prerequisites
    $ npm i -g rimraf eslint babel-eslint eslint-plugin-react
    $ npm i
 Set your env variables inside .env for twitter fetching.

## Info
This repo contains 2 branches:
* `master` - State without Redux
* `redux`  - Same app migrated to redux `//TODO`

##  Start
    $ npm run watch
Open [http://localhost:8081/](http://localhost:8081/)
