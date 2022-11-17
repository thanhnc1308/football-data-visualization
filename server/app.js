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
  console.log(req.query);
  const maxDate = new Date(8640000000000000);
  const minDate = new Date(-8640000000000000);
  let startDate = minDate;
  let endDate = maxDate;
  if (req.query.startDate) {
    startDate = new Date(req.query.startDate);
  }
  if (req.query.endDate) {
    endDate = new Date(req.query.endDate);
  }
  console.log(startDate);
  console.log(endDate);
  const filteredFootfallData = FootfallData.filter((item) => {
    const Time = new Date(item.Time);
    return startDate <= Time && Time <= endDate;
  });
  res.send({
    status: httpStatus.OK,
    data: filteredFootfallData,
  });
});

module.exports = app;
