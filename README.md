# REST API - Setting up a Node.js development environment with Express.js

*December 2020*

> 🔨 From udemy '[Setting up a Node development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)'.


![Node Logo](_readme-img/nodejs-logo.png)

## Function created in node_modules

**app.js**

````js
const func = require('functions')
````


**functions**

````js
exports.success = function (result){
  return {
    status: 'success',
    result: result
  }
}

exports.error = function (message){
  return {
    status: 'error',
    result: message
  }
}
````

## Dependancies

- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for node.

`npm i express`

- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for node.js

`npm i morgan`

- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware

`npm i body-parser`

Note: not needed. Use:

````js
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
````


## Batch useful commands

`sudo netstat -lpn |grep :8080`: check if port 8080 is used and display its PID

`sudo kill -9 <PID>`: kill the process used by PID

`sudo fuser -k 8001/tcp`: kill the port 8001

------------------

## Ressources

- [MDN: Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [ExpressJS](https://expressjs.com/fr/)
