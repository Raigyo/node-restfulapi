require("babel-register"); // ES6 conversion
const express = require('express');
const mysql = require('promise-mysql');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./public/config');
const {checkAndChange} = require('./public/functions');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger-'+config.env+'.json');
// const morgan  = require('morgan');

// DB connexion - OK: launch app / KO: catch error
mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
}).then((db) => {
  console.log('Connected to database');

  // Routing init
  const app = express();
  app.use(helmet()); // adding Helmet to enhance API's security
  // enabling CORS for all requests
  // app.use(cors())
  const corsOptions = {
    origin: 'http://localhost:8080/',
    optionsSuccessStatus: 200 // For legacy browser support
  }

  app.use(cors(corsOptions));

  // expressOasGenerator.init(app, {});
  let MembersRouter = express.Router();
  let Members = require('./public/classes/Members')(db, config);

  // We use morgan to check url request in console - dev
  // app.use(morgan('dev'))
  if (config.env === "development") {
    const devMorgan= require('./public/morgan');
    app.use(devMorgan('dev'));
  };

  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  //app.use(process.env.API_HOST_PROD + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Route "/"
    // GET
    app.get("/members", async (req, res) => {
      let allMembers = await Members.getAll(req.query.max);
      res.json(checkAndChange(allMembers));
    })

   // POST
    app.post("/members", async(req, res) => {
      let addMember = await Members.add(req.body.name);
      res.json(checkAndChange(addMember));
    })// \POST
  // \Route /

  // Route "/:id"
    // GET - id
    app.get("/members/:id", async (req, res) => {
        let member = await Members.getByID(req.params.id);
        res.json(checkAndChange(member));
    })// \GET - id
   // PUT
    app.put("/members/:id", async(req, res) => {
      let updateMember = await Members.update(req.params.id, req.body.name);
      res.json(checkAndChange(updateMember));
    })// \PUT
    // DELETE
    app.delete("/members/:id", async(req, res) => {
        let updateMember = await Members.delete(req.params.id);
        res.json(checkAndChange(updateMember));
    })// \DELETE
  // \Route /:id

  // Middleware for routes: path
    app.use(config.rootAPI+'members', MembersRouter);

  // Port listening dev
  if (config.env === "development") {
    app.listen(config.port, () => console.log(
      'Started on port '+config.port+ ', url: ' +config.rootAPI+'members','\n',
      'PHP my Admin :'+config.phpMyAdmin,'\n',
      'Swagger: '+config.rootAPI + 'api-docs')
    );
  };
  // Port listening HEROKU
  if (config.env === "production") {
    app.listen(process.env.PORT || 5000, () => console.log(
      'Started on : '+process.env.PORT +', url: '+config.rootAPI+'members', '\n',
      process.env.API_HOST_PROD + 'api-docs')
    );
  };
}) // \ .then
.catch((err) => {
  console.log('Error during database connection: ' + err.message);
}); // \ Promise mysql.createConnection