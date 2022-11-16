const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const { FootfallData } = require('./data');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/footfall', (req, res) => {
  res.send({
    status: httpStatus.OK,
    data: FootfallData,
  });
});

module.exports = app;
