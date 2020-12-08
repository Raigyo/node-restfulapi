require("babel-register"); // ES6 conversion
const express = require('express'); // use of express
const func = require('functions'); // use of module creation in node_modules
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

// Middlewares
// are executed before 'app.get'

// Our own middleware to display url in console
// app.use(function (req, res, next) {
//   console.log('URL : '+ req.url)
//   next(); // function that leaves the hand to next middleware function once code is completed
// })

// We use morgan instead
app.use(morgan('dev'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/v1/members/:id', (req, res) => {
  res.json(func.success(members[(req.params.id)-1].name));
})

// GET
app.get('/api/v1/members', (req, res) => {
  // query: after '?' in url
  if (req.query.max != undefined > 0){
    res.json(func.success(members.slice(0, req.query.max)));
  } else if (req.query.max != undefined){
    res.json(func.error('Wrong max value'));
  } else {
    res.json(func.success(members));
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
      res.json(func.error('name already taken'));
    } else {
      let member = {
        id: members.length+1,
        name: req.body.name
      }
      members.push(member)
      res.json(func.success(member))
    }
  } else {
    res.json(func.error('no name value'))
  }
})

// Port listening
app.listen(8080, () => console.log('Started on port 8080: http://localhost:8080/api'));

