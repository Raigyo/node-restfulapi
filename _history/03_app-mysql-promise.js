require("babel-register"); // ES6 conversion
const express = require('express');
const {success, error} = require('./assets/functions');
const mysql = require('promise-mysql');
const morgan  = require('morgan'); // use of morgan - dev
const uuid = require('uuid/v1');
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
        .get((req, res) => {
          db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
            if (err) {
              res.json(error(err.message));
            } else {
                if (result[0] != undefined) {
                  res.json(success(result[0]))
                } else {
                  res.json(error('Wrong id value'))
                }
            }
          })
        })// \GET - id

        // PUT
        .put((req, res) => {
          if (req.body.name) {
            db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
              if (err) {
                res.json(error(err.message))
              } else {
                  if (result[0] != undefined) { // Id exists so we check if the name doesn't already exists
                    db.query('SELECT * FROM members WHERE name = ? AND id != ?', [req.body.name, req.params.id], (err, result) => {
                      if (err) {
                          res.json(error(err.message))
                      } else {
                          if (result[0] != undefined) { // Same name found
                              res.json(error('Name already exists'))
                          } else {// Now we can modify the member
                              db.query('UPDATE members SET name = ? WHERE id = ?', [req.body.name, req.params.id], (err, result) => {
                                  if (err) {
                                      res.json(error(err.message))
                                  } else { // modify datas
                                      res.json(success(true))
                                  }
                              })
                          }
                      }
                    })
                  } else {
                      res.json(error('Wrong id'))
                  }
              }
            })
          } else { // No name inserted
              res.json(error('No name value'))
          }
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
        .get((req, res) => {
          if (req.query.max != undefined && req.query.max > 0){
            db.query('SELECT * FROM members LIMIT 0, ?', [req.query.max], (err, result) => {
              if (err) {
                res.json(error(err.message));
              }
              else {
                res.json(success(result));
              }
            });
          } else if (req.query.max != undefined){
            res.json(error('Wrong max value'));
          } else {
            db.query('SELECT * FROM members', (err, result) => {
              if (err) {
                res.json(error(err.message));
              }
              else {
                res.json(success(result));
              }
            });
          }
        })// \GET

        // POST
        .post((req, res) => {
          if (req.body.name){
            db.query('SELECT * FROM members WHERE name = ?', [req.body.name], (err, result) => {
              if (err) {
                res.json(error(err.message))
              } else {
                // check if the name is already taken in DB
                if ( result[0] != undefined ) {
                  res.json(error("Name already taken"));
                } else {
                  db.query('INSERT INTO members(id, name) VALUES(?, ?)', [req.body.id, req.body.name], (err, result) => {
                    if (err) {
                      res.json(error("Insert:" + err.message))
                    } else {
                      db.query('SELECT * FROM members WHERE name = ?', [req.body.name], (err, result) => {
                        if (err) {
                          res.json(error(err.message))
                        } else {
                          res.json(success({
                            id: uuid(),
                            name: result[0].name
                          }))
                        }
                      })
                    }
                  })
                }
              }
            })// \db.query
          }
          else {
            res.json(error('No name value'))
          }
        })// \POST
      //\Route /

      // Middleware for routes: path
      app.use(config.rootAPI+'members', MembersRouter);

      // Port listening
      app.listen(config.port, () => console.log(
        'Started on port '+config.port+': http://localhost:'+config.port+config.rootAPI+'members')
      );
  })//\then
.catch((err) => {
  console.log('Error during database connection: ' + err.message);
})