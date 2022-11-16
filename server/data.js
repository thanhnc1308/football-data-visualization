const csv = require('csv-parse');
const fs = require('fs');

const parser = fs
  .createReadStream('./Footfall.csv')
  .pipe(csv.parse({ delimiter: ';', columns: true, relax_quotes: true, escape: '\\', ltrim: true, rtrim: true }));

const FootfallData = [];

parser.on('readable', function () {
  let record;
  while ((record = parser.read()) !== null) {
    const recordValues = Object.values(record);
    FootfallData.push({
      Time: new Date(recordValues[0]),
      Value: parseInt(recordValues[1], 10),
    });
  }
});

parser.on('error', function (err) {
  console.error(err.message);
});

parser.on('end', function () {
  console.log('END reading file');
});

module.exports = { FootfallData };
