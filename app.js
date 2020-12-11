require("babel-register"); // ES6 conversion
const express = require('express');
const {success, error} = require('module_creation/functions'); // use of module creation in node_modules
const mysql = require('mysql');
const morgan  = require('morgan'); // use of morgan - dev
const uuid = require('uuid/v1');
const config = require('./config');


const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'nodejs',
  user: 'chilot',
  password: '25_01_75_U'
});

db.connect((err) => {
  if (err)
    console.log(err.message)
  else {
    console.log('Connected')

      // Routing init
      const app = express();
      let MembersRouter = express.Router();

      // We use morgan to check url request in console
      app.use(morgan('dev'));

      app.use(express.json()) // for parsing application/json
      app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

      // Route /:id
      MembersRouter.route('/:id')
        // GET - id
        .get((req, res) => {

          let index = getIndex(req.params.id);

          if (typeof(index) == 'string') {
            // if it's a string it's the error message
            res.json(error(index)); // send error message
          } else {
            res.json(success(members[index]));
          }
        })

        // PUT
        .put((req, res) => {
          let index = getIndex(req.params.id);

          if (typeof(index) == 'string') {
            res.json(error(index)); // send error message
          } else {
            // let member = members[index];
            // let same = false;
            if ( members.find( ( { name } ) => name === req.body.name )
                && members.find( (  { id } ) => id !== req.body.id )  ) {
              res.json(error('Same name'))
            } else {
              // name different: we put the name
              members[index].name = req.body.name;
              res.json(success(true));
            }
          }
        })

        // DELETE
        .delete((req, res) => {
          let index = getIndex(req.params.id);

          if (typeof(index) == 'string') {
            // if it's a string it's the error message
            res.json(error(index)); // send error message
          } else {
            /*The splice() method changes the contents of an array by removing or replacing existing
            elements and/or adding new elements in place.*/
            members.splice(index, 1);
            res.json(success(members));
          }
        })
      //\Route /:id

      // Route /
      MembersRouter.route('/')
        // GET
        .get((req, res) => {
          // query: after '?' in url
          if (req.query.max != undefined > 0){
            /* The slice() method returns a shallow copy - a copy of the collection structure,
            not the elements - of a portion of an array into a new array
            object selected from start to end (end not included) where start and end
            represent the index of items in that array. The original array will not be modified.*/
            res.json(success(members.slice(0, req.query.max)));
          } else if (req.query.max != undefined){
            res.json(error('Wrong max value'));
          } else {
            res.json(success(members));
          }
        })

        // POST
        .post((req, res) => {
          if (req.body.name){
            // check if the name is already taken
              if ( members.find( ( { name } ) => name === req.body.name ) ) {
                res.json( error( "Name already taken" ) );
              } else {
              let member = {
                id: uuid(),
                name: req.body.name
              }
              members.push(member)
              res.json(success(member))
            }
          } else {
            res.json(error('No name value'))
          }
        })
      //\Route /

      // Middleware for routes: path
      app.use(config.rootAPI+'members', MembersRouter);

      // Port listening
      app.listen(config.port, () => console.log(
        'Started on port '+config.port+': http://localhost:'+config.port+config.rootAPI+'members')
      );
  }
})//\db.connect



// Helper functions
function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id)
      return i;
  }
  return 'wrong id'
}
