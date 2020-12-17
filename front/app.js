// Modules
require("babel-register");
const express = require('express');
const morgan  = require('morgan');
const axios = require('axios');
const twig = require('twig');

// Glabal vars
const app = express();
const port = 8082;
const fetch = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
});

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
// Homepage
app.get('/', (req, res) => {
  // res.send('Okay');
  // res.render('index.twig');
  res.redirect('/members');
});

// Page retrieving all members
app.get('/members', (req, res) => {
  // apiCall(url, method, data, res, next)
  apiCall(req.query.max ? '/members?max='+req.query.max : '/members', 'get', {}, res, (result) => {
      res.render('members.twig', {
          members: result
      })
  })
});

// Page retrieving one member
app.get('/members/:id', (req, res) => {
  apiCall('/members/'+req.params.id, 'get', {}, res, (result) => {
      res.render('member.twig', {
          member: result
      })
  })
});

// Page to edit a member
app.get('/edit/:id', (req, res) => {
  apiCall('/members/'+req.params.id, 'get', {}, res, (result) => {
      res.render('edit.twig', {
          member: result
      })
  })
});

// Method to edit a member
app.post('/edit/:id', (req, res) => {
  apiCall('/members/'+req.params.id, 'put', {
      name: req.body.name
  }, res, () => {
      res.redirect('/members');
  })
});

// Method to delete a member
app.post('/delete', (req, res) => {
  apiCall('/members/'+req.body.id, 'delete', {}, res, () => {
      res.redirect('/members')
  })
});

// Page to add a member
app.get('/insert', (req, res) => {
  res.render('insert.twig')
});

// Method to add a member
app.post('/insert', (req, res) => {
  apiCall('/members', 'post', {name: req.body.name}, res, () => {
      res.redirect('/members')
  })
});

// App launch
app.listen(port, () => console.log(
  'Front started on port '+port+': http://localhost:'+port)
);

// Functions

// Error page
function renderError(res, errMsg) {
  // console.log("errMsg: ", errMsg);
  res.render('error.twig', {
      errorMsg: errMsg
  })
}

// Responses
function apiCall(url, method, data, res, next) {
  fetch({
    // Requests can be made by passing the relevant config to axios.
    method: method,
    url: url,
    data: data
  }).then((response) => {
      if (response.data.status == 'success') {
          next(response.data.result)
      } else {
          renderError(res, response.data.result)
      }
  })
  .catch((err) => renderError(res, err.message))
}