require("babel-register"); // ES6 conversion
const express = require('express');
const config = require('./public/config');
// const expressOasGenerator = require('express-oas-generator'); // create json with api map
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger-prod.json');
const {checkAndChange} = require('./public/functions');
const mysql = require('promise-mysql');
if (config.env === "development") {const morgan  = require('morgan')}; // use of morgan - dev

console.log("Environment: ", config.env)

// use config.js using async

mysql.createPool({
  host: process.env.DB_HOST_PROD,
  port: process.env.DB_PORT_PROD,
  database: process.env.DB_NAME_PROD,
  user: process.env.DB_USER_PROD,
  password: process.env.DB_PASSWORD_PROD
}).then((db) => {
  console.log('Connected to database');

  // Routing init
  const app = express();
  // expressOasGenerator.init(app, {});
  let MembersRouter = express.Router();
  let Members = require('./public/classes/Members')(db, config);

  // We use morgan to check url request in console
  if (config.env === "development") {app.use(morgan('dev'))};

  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  //app.use(process.env.API_HOST_PROD + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(process.env.API_HOST_PROD + 'api-docs');

  // Route "/"
    // GET
    app.get("/", async (req, res) => {
      let allMembers = await Members.getAll(req.query.max);
      res.json(checkAndChange(allMembers));
    })

   // POST
    app.post("/", async(req, res) => {
      let addMember = await Members.add(req.body.name);
      res.json(checkAndChange(addMember));
    })// \POST
  // \Route /

  // Route "/:id"
    // GET - id
    app.get("/:id", async (req, res) => {
        let member = await Members.getByID(req.params.id);
        res.json(checkAndChange(member));
    })// \GET - id
   // PUT
    app.put("/:id", async(req, res) => {
      let updateMember = await Members.update(req.params.id, req.body.name);
      res.json(checkAndChange(updateMember));
    })// \PUT
    // DELETE
    app.delete("/:id", async(req, res) => {
        let updateMember = await Members.delete(req.params.id);
        res.json(checkAndChange(updateMember));
    })// \DELETE
  // \Route /:id

  // Middleware for routes: path
    app.use(config.rootAPI+'members', MembersRouter);

  // Port listening dev
  if (config.env === "development") {
    app.listen(config.portAPI, () => console.log(
      'Started on port '+config.portAPI+': '+config.rootAPI+'members')
    );
  };
  // Port listening HEROKU
  if (config.env === "production") {
    app.listen(process.env.PORT || 5000, () => console.log(
      'Started on port '+process.env.PORT +': '+config.rootAPI+'members')
    );
  };
}) // \ .then
.catch((err) => {
  console.log('Error during database connection: ' + err.message);
}); // \ Promise mysql.createConnection