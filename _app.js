require("babel-register"); // ES6 conversion
const express = require('express') // use of express
const morgan  = require('morgan') // use of morgan - dev
const app = express()

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

app.get('/api/v1/members/:id', (req, res) => {
  res.send(members[(req.params.id)-1].name)
})

app.get('/api/v1/members', (req, res) => {
  // query: after '?' in url
  if (req.query.max != undefined > 0){
    res.send(members.slice(0, req.query.max))
  } else {
    res.send(members)
  }
})

// GET - request, result
// app.get('/api', (req, res) => {
//   res.send('Root API')
// })

// app.get('/api/v1', (req, res) => {
//   res.send('Root API v1')
// })

// app.get('/api/v1/:id', (req, res) => {
//   res.send(req.params) // we can retrive properties of the paramater
// })


// Port listening
app.listen(8080, () => console.log('Started on port 8080: http://localhost:8080/api'))