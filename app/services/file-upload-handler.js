const formidable = require("formidable");
const fs = require("fs");
const { parse } = require("./csv-parser");
import handler from "./export-handler";
import init from "./timesheet-initializer";
import calculate from './timesheet-calculator';

function handle(req, callback) {
  let result;
  new formidable.IncomingForm()
    .parse(req)
    .on("field", (name, field) => {
      // console.log("Field", name, field);
    })
    .on("file", (name, file) => {
      fs.readFile(file.path, "utf8", function(err, data) {
        if (err) throw err;

        parse(data, items => {
          // console.log(items);
          const timesheet = init(items);
          calculate(timesheet);
          console.log(timesheet);
          // handler(items, () => {
          //   return callback(items.map(i => i.date));
          // });

          return callback(timesheet.workWeeks);
        });
      });
    });
}

module.exports = {
  handle: handle
};
