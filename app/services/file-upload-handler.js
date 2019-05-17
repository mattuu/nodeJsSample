import formidable from "formidable";
import fs from "fs";
import { parse } from "./csv-parser";
import init from "./timesheet-initializer";
import populate from "./timesheet-calculator";

export default function handle(req, callback) {
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
          populate(timesheet);
          // console.log(timesheet);
          // handler(items, () => {
          //   return callback(items.map(i => i.date));
          // });

          return callback(timesheet.workWeeks);
        });
      });
    });
}
