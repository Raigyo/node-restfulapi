// Modules
require("babel-register");
const express = require('express');
const morgan  = require('morgan');
const axios = require('axios');
const twig = require('twig');

// Glabal vars
const app = express();
const port = 8082;
const apiCall = axios.create({
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
  res.render('index.twig');
});

// Page retrieving all members
app.get('/members', (req, res) => {
  apiCall.get('/members')
      .then((response) => {
        if (response.data.status == "success") {
          res.render('members.twig', {
            members: response.data.result
          })
        } else {
          // console.log(response.data);
          // console.log(response.status);
          // console.log(response.headers);
          renderError(res, response.data.result)
        }
      })
      .catch((err) => renderError(res, err.message))
});

// Page retrieving one member
app.get('/members/:id', (req, res) => {
  apiCall.get('/members/'+req.params.id)
      .then((response) => {
        if (response.data.status == 'success') {
          res.render('member.twig', {
            member: response.data.result
          })
        } else {
          renderError(res, response.data.result)
        }
      })
      .catch((err) => renderError(res, err.message))
});

// App launch
app.listen(port, () => console.log(
  'Front started on port '+port+': http://localhost:'+port)
);

// Functions

function renderError(res, errMsg) {
  // console.log("errMsg: ", errMsg);
  res.render('error.twig', {
      errorMsg: errMsg
  })
}