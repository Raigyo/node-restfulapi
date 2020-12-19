require("babel-register"); // ES6 conversion
const express = require('express');
// const expressOasGenerator = require('express-oas-generator'); // create json with api map
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');
const {success, error, checkAndChange} = require('./public/functions');
const mysql = require('promise-mysql');
//const morgan  = require('morgan'); // use of morgan - dev
const config = require('./public/config');

console.log(config);

//mysql.createConnection({
mysql.createPool({
  host: config.db.host,
  //port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
}).then((db) => {
  console.log('Connected to database')

  // Routing init
  const app = express();
  // expressOasGenerator.init(app, {});
  let MembersRouter = express.Router();
  let Members = require('./public/classes/Members')(db, config);

  // We use morgan to check url request in console
  //app.use(morgan('dev'));

  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(config.rootAPI+'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Route /:id
  MembersRouter.route('/:id')
    // GET - id
    .get(async (req, res) => {
      let member = await Members.getByID(req.params.id);
      res.json(checkAndChange(member));
    })// \GET - id

    // PUT
    .put(async(req, res) => {
      let updateMember = await Members.update(req.params.id, req.body.name);
      res.json(checkAndChange(updateMember));
    })// \PUT

    // DELETE
    .delete(async(req, res) => {
      let updateMember = await Members.delete(req.params.id);
      res.json(checkAndChange(updateMember));
    })// \DELETE
  //\Route /:id

  // Route /
  MembersRouter.route('/')
    // GET
    .get(async (req, res) => {
      let allMembers = await Members.getAll(req.query.max);
      res.json(checkAndChange(allMembers));
    })// \GET

    // POST
    .post(async(req, res) => {

      let addMember = await Members.add(req.body.name);
      res.json(checkAndChange(addMember));

    })// \POST

  //\Route /

  // Middleware for routes: path
  app.use(config.rootAPI+'members', MembersRouter);

  // Port listening
  app.listen(config.port, () => console.log(
    'Started on port '+config.port+':'+config.port+config.rootAPI+'members')
  );
}) // \ .then
.catch((err) => {
  console.log('Error during database connection: ' + err.message);
}); // \ Promise mysql.createConnection