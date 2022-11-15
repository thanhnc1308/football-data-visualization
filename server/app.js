const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('ok');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new Error(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;
