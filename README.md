# REST API - Setting up a Node.js development environment with Express.js

*December 2020*

> 🔨 From udemy '[Apprendre Node.js & Créer une API REST de A à Z !](https://www.udemy.com/course/nodejs-api-rest/)'.


![Node Logo](_readme-img/nodejs-logo.png)

## CURL request

**GET ID**

`curl -X GET "http://localhost:8080/api/v1/members/<ID>" -H  "accept: application/json"`

**PUT**

`curl -X PUT "http://localhost:8080/api/v1/members/<ID>" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"name\": \"<NEW-NAME>\"}"`

**DELETE**

`curl -X DELETE "http://localhost:8080/api/v1/members/<ID>" -H  "accept: application/json"`

**GET**

`curl -X GET "http://localhost:8080/api/v1/members" -H  "accept: application/json"`

**POST**

`curl -X POST "http://localhost:8080/api/v1/members" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"name\": \"<NEW-NAME>\"}"`

## Postman

The following file can be imported in Postman to make CRUD operations test: [NodeJS-members.postman_collection.json](./_postman/NodeJS-members.postman_collection.json)

![swagger capture](_readme-img/postman-01.png)

## OpenAPI 3.0 / Swagger

### express-oas-generator

Install: `npm i express-oas-generator`

**app.js**
````js
const expressOasGenerator = require('express-oas-generator'); // create json with api map

// ...

  // Routing init
  const app = express();
  expressOasGenerator.init(app, {});
````

`npm start`

[http://localhost:8080/docs](http://localhost:8080/docs)

Click on *Specification Json* and copy the content.

Paste the content in a created file *swagger.json*.

NB: *express-oas-generator* isn't useful and can be removed using `npm un express-oas-generator`.

Remove the following lines:

````js
const expressOasGenerator = require('express-oas-generator'); // new line
// ...
  const app = express();
  expressOasGenerator.init(app, {}); // new line
````
### swagger-ui-express

Install: `npm i swagger-ui-express`

**app.js**
````js
const swaggerUi = require('swagger-ui-express'); // new line
const swaggerDocument = require('./swagger.json'); // new line, use the right path to the file

// ...

  app.use(express.urlencoded({ extended: true }));
  app.use(config.rootAPI+'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // new line

  // Route /:id
  MembersRouter.route('/:id')

````

`npm start`

[http://localhost:8080/api/v1/api-docs](http://localhost:8080/api/v1/api-docs)

The file *swagger.json* can be edited to provide more accurate informations.

In this repo: [swagger.json](./assets/swagger.json)

See:

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger Editor](https://swagger.io/tools/swagger-editor/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

![swagger capture](_readme-img/swagger-01.png)

## Dependancies

- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for node.

`npm i express`

- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for node.js.

`npm i morgan`

- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.

`npm i body-parser`

Note: not needed.

Use instead in *app.js**:

````js
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
````
- [uuid](https://www.npmjs.com/package/uuid): For the creation of RFC4122 UUIDs.

`npm i uuid`

- [mysql](https://www.npmjs.com/package/mysql): MySQL client for Node.js.

`npm i mysql`

Used in developpment but replaced by *promise-mysql*.

- [promise-mysql](https://www.npmjs.com/package/promise-mysql): Promise-mysql is a wrapper for mysqljs/mysql that wraps function calls with Bluebird promises.

`npm i promise-mysql`

- [express-oas-generator](https://www.npmjs.com/package/express-oas-generator):

  -- automatically generate OpenAPI (Swagger) specification for existing ExpressJS 4.x REST API applications;
  -- provide Swagger UI basing on generated specification.

  NB: can be removed after generating json.

`npm i express-oas-generator`

- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a *swagger.json* file. The result is living documentation for your API hosted from your API server via a route.

`npm i swagger-ui-express`

[http://localhost:8080/api/v1/api-docs/](http://localhost:8080/api/v1/api-docs/)

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

## MySql 8 & NodeJS: mysql_native_password

````sql
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';
````

Because *mysqljs* in Node (the package you install with npm i mysql and use it in your Node code) doesn't support the *caching_sha2_password* authentication method of MySQL 8, we use *mysql_native_password*:

````sql
ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
````

## Bash useful commands

`sudo netstat -lpn |grep :8080`: check if port 8080 is used and display its PID.

`sudo kill -9 <PID>`: kill the process used by PID.

`sudo fuser -k 8080/tcp`: kill the port 8080.

------------------

## Ressources

- [MDN: Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [ExpressJS](https://expressjs.com/fr/)
- [Swagger](https://swagger.io/)
