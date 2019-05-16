const express = require("express");
var excel = require("excel4node");
const app = express();
var path = require("path");
const port = 8081;
const formidable = require("formidable");
const parse = require("csv-parse");
var fs = require("fs");
const routes = require("./routes");

import moment from "moment";

moment.updateLocale('en', {
  week : {
      dow : 1,
      doy : 4
   }
});

app.use(routes);

app.get("/download", function(req, res) {
  // Require library

  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Sheet 1");
  var worksheet2 = workbook.addWorksheet("Sheet 2");

  // Create a reusable style
  var style = workbook.createStyle({
    font: {
      color: "#FF0800",
      size: 12
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -"
  });

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  worksheet
    .cell(1, 1)
    .number(100)
    .style(style);

  // Set value of cell B1 to 300 as a number type styled with paramaters of style
  worksheet
    .cell(1, 2)
    .number(200)
    .style(style);

  // Set value of cell C1 to a formula styled with paramaters of style
  worksheet
    .cell(1, 3)
    .formula("A1 + B1")
    .style(style);

  // Set value of cell A2 to 'string' styled with paramaters of style
  worksheet
    .cell(2, 1)
    .string("string")
    .style(style);

  // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  worksheet
    .cell(3, 1)
    .bool(true)
    .style(style)
    .style({ font: { size: 14 } });

  workbook.write("Excel.xlsx");

  var file = "Excel.xlsx";
  // res.setHeader("")
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
