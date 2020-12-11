# REST API - Setting up a Node.js development environment with Express.js

*December 2020*

> 🔨 From udemy '[Apprendre Node.js & Créer une API REST de A à Z !](https://www.udemy.com/course/nodejs-api-rest/)'.


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

- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for node.js.

`npm i morgan`

- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.

`npm i body-parser`

Note: not needed. Use:

````js
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
````
- [uuid](https://www.npmjs.com/package/uuid): For the creation of RFC4122 UUIDs.

`npm i uuid`

- [mysql](https://www.npmjs.com/package/mysql): MySQL client for Node.js.

`npm i mysql`

## Bash useful commands

`sudo netstat -lpn |grep :8080`: check if port 8080 is used and display its PID.

`sudo kill -9 <PID>`: kill the process used by PID.

`sudo fuser -k 8080/tcp`: kill the port 8001.

## Module creation on Github (exclude node_modules excepted one folder or file)

**.gitignore**

````bash
# Node modules excepted module creation

node_modules/**
# whitelist folder
!/node_modules/module_creation/
# whitelist files
!/node_modules/module_creation/*
````

## Xamp and MySql

**Error: MySQL shutdown unexpectedly.**

*This may be due to a blocked port, missing dependencies, improper privileges, a crash, or a shutdown by another method. Press the Logs button to view error logs and check the Windows Event Viewer for more clues If you need more help, copy and post this entire log window on the forums*

- Rename the folder *mysql/data* to *mysql/data_old* (you can use any name)
- Create a new folder *mysql/data*
- Copy the content that resides in *mysql/backup* to the new *mysql/data* folder
- Copy all your database folders that are in *mysql/data_old* to *mysql/data* (skipping the mysql, performance_schema, and phpmyadmin folders from *data_old*)
- Finally copy the *ibdata1* file from *mysql/data_old* and replace it inside *mysql/data* folder
- Start MySQL from XAMPP control panel

------------------

## Ressources

- [MDN: Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [ExpressJS](https://expressjs.com/fr/)
