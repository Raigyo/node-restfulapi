require("babel-register"); // ES6 conversion
const express = require('express');
const {success, error, checkAndChange} = require('./assets/functions');
const mysql = require('promise-mysql');
const morgan  = require('morgan'); // use of morgan - dev
const config = require('./assets/config');

mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
}).then((db) => {
  console.log('Connected')

  // Routing init
  const app = express();
  let MembersRouter = express.Router();
  let Members = require('./assets/classes/Members')(db, config);

  // We use morgan to check url request in console
  app.use(morgan('dev'));

  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
    .delete((req, res) => {
      db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.json(error(err.message))
        } else {
            if (result[0] != undefined) {
                db.query('DELETE FROM members WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(true))
                    }
                })
            } else {
                res.json(error('Wrong id'))
            }
        }
      })
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
    'Started on port '+config.port+': http://localhost:'+config.port+config.rootAPI+'members')
  );
}) // \ .then
.catch((err) => {
  console.log('Error during database connection: ' + err.message);
}); // \ Promise mysql.createConnection