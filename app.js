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


// GET
app.get('/api/v1/members', (req, res) => {
  // query: after '?' in url
  if (req.query.max != undefined > 0){
    /* The slice() method returns a shallow copy - a copy of the collection structure,
    not the elements- of a portion of an array into a new array
    object selected from start to end (end not included) where start and end
    represent the index of items in that array. The original array will not be modified.*/
    res.json(success(members.slice(0, req.query.max)));
  } else if (req.query.max != undefined){
    res.json(error('Wrong max value'));
  } else {
    res.json(success(members));
  }
})

// GET - id
app.get('/api/v1/members/:id', (req, res) => {

  let index = getIndex(req.params.id);

  if (typeof(index) == 'string') {
    // if it's a string it's the error message
    res.json(error(index)); // send error message
  } else {
    res.json(success(members[index]));
  }
})

// DELETE
app.delete('/api/v1/members/:id', (req, res) => {
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
        // id: members.length+1,
        id: createID(),
        name: req.body.name
      }
      members.push(member)
      res.json(success(member))
    }
  } else {
    res.json(error('no name value'))
  }
})

// PUT
app.put('/api/v1/members/:id', (req, res) => {
  let index = getIndex(req.params.id);

  if (typeof(index) == 'string') {
    res.json(error(index)); // send error message
  } else {
    let member = members[index];
    let same = false;
    for (let i = 0; i < members.length; i++) {
      // We don't want two members with the same name
      // we check if names are the same and id are differents
      if (req.body.name == members[i].name && req.params.id != members[i].id) {
        same = true
        break
      }
    }

    if (same) {
      // same name error
      res.json(error('same name'))
    } else {
      // name different: we put the name
      members[index].name = req.body.name;
      res.json(success(true));
    }
  }
})

// Port listening
app.listen(8080, () => console.log('Started on port 8080: http://localhost:8080/api/v1/members'));


// Helper
function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id)
      return i;
  }
  return 'wrong id'
}

function createID() {
  // id of the last member of the array + 1
  return members[members.length-1].id + 1;
}