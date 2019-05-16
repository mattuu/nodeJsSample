// const parse = require("csv-parse");
import parse from "csv-parse";
import { WorkDay } from "../models";

function parseCsv(input, callback) {
  parse(input, { columns: true }, function(err, output) {
    if (err) {
      console.error(err);
      return;
    }

    // console.log(output);
    let data = output.map(item => {
      //  console.log(item['Clocked In']);
      return new WorkDay(item);
    });

    callback(data);
  });
}

module.exports = {
  parse: parseCsv
};
