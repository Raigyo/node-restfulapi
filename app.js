require("babel-register"); // ES6 conversion
const express = require('express'); // use of express
const {success, error} = require('functions'); // use of module creation in node_modules
const morgan  = require('morgan'); // use of morgan - dev
const app = express();

const members = [
  {
    id: 1,
    name: 'John'
  },
  {
    id: 2,
    name: 'Julie'
  },
  {
    id: 3,
    name: 'Jack'
  }
]


// We use morgan to check url request in console
app.use(morgan('dev'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/v1/members/:id', (req, res) => {

  let index = getIndex(req.params.id);

  if (typeof(index) == 'string') {
    // if it's a string it's the error message
    res.json(error(index)); // send error message
  } else {
    res.json(success(members[index]));
  }
})

// GET
app.get('/api/v1/members', (req, res) => {
  // query: after '?' in url
  if (req.query.max != undefined > 0){
    res.json(success(members.slice(0, req.query.max)));
  } else if (req.query.max != undefined){
    res.json(error('Wrong max value'));
  } else {
    res.json(success(members));
  }
})

// POST
app.post('/api/v1/members', (req, res) => {
  if (req.body.name){
    // check if the name is already taken
    let sameName = false;
    for (let i = 0; i < members.length; i++) {
      if (members[i].name == req.body.name) {
        sameName = true; // prevent [ERR_HTTP_HEADERS_SENT]
        break;
      }
    }
    if (sameName){
      res.json(error('name already taken'));
    } else {
      let member = {
        id: members.length+1,
        name: req.body.name
      }
      members.push(member)
      res.json(success(member))
    }
  } else {
    res.json(error('no name value'))
  }
})

// Port listening
app.listen(8080, () => console.log('Started on port 8080: http://localhost:8080/api'));

function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id)
      return i;
  }
  return 'wrong id'
}