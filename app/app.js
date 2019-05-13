const express = require("express");
var excel = require("excel4node");
const app = express();
var path = require("path");
const port = 8081;
const formidable = require("formidable");
const parse = require("csv-parse");
var fs = require("fs");

app.get("/file", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/file", function(req, res) {
  new formidable.IncomingForm()
    .parse(req)
    .on("field", (name, field) => {
      console.log("Field", name, field);
    })
    .on("file", (name, file) => {
      var workbook = new excel.Workbook();
      var worksheet = workbook.addWorksheet("Sheet 1");
      var style = workbook.createStyle({
        font: {
          color: "#FF0800",
          size: 12
        },
        numberFormat: "$#,##0.00; ($#,##0.00); -"
      });

      fs.readFile(file.path, "utf8", function(err, data) {
        if (err) throw err;
        // data.forEach(function(d, i) {

        parse(data, function(err, records) {
          Array.from(records).forEach(function(item, index) {
            console.log(item);
            worksheet.cell(index + 1, 1).string(item[0]).style(style);
            worksheet.cell(index + 1, 2).string(item[1]).style(style);
          });
        });

        workbook.write("Excel.xlsx");
        // });
      });

      // Create a new instance of a Workbook class
      var file = "Excel.xlsx";
      // res.setHeader("")
      res.download(file); // Set disposition and send it.
    })
    .on("aborted", () => {
      console.error("Request aborted by the user");
    })
    .on("error", err => {
      console.error("Error", err);
      throw err;
    })
    .on("end", () => {
      res.end();
    });
});

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
