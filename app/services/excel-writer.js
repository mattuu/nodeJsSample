import excel from "excel4node";

export default function write(timesheet) {
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Sheet 1");

  const styleTime = workbook.createStyle({
    font: {
      size: 12
    }
  });
  // Create a reusable style

  //   writeWorkWeek(worksheet, timesheet.workWeeks[1], 1, 1);

  worksheet.cell(1, 1).string("My simple string");

  //   properties.forEach((property, index) => {
  //     worksheet
  //       .cell(index + 1, 1)
  //       .string(property.id)
  //       .style(style);
  //     worksheet
  //       .cell(index + 1, 2)
  //       .string(property.name)
  //       .style(style);
  //   });
  //   workbook.write("ExcelFile.xlsx", function(err, stats) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log(stats); // Prints out an instance of a node.js fs.Stats object
  //     }
  //   });
  //   workbook.write("Excel.xlsx");
  return worksheet.write;
}

function writeWorkWeek(worksheet, workWeek, row, col) {
  for (let wd in workWeek.days) {
    writeWorkDay(worksheet, wd, col, row);
  }
}

function writeWorkDay(worksheet, workDay, row, col) {
  worksheet
    .cell(col, row)
    .date(workDay.date)
    .style({ numberFormat: "dd-MMM" });
  worksheet
    .cell(col, row + 1)
    .date(workDay.timeInAdjusted)
    .style({ numberFormat: "HH:mm" });
  worksheet
    .cell(col, row + 2)
    .date(workDay.totalBreaksAdjusted)
    .style({ numberFormat: "HH:mm" });
  worksheet
    .cell(col, row + 3)
    .date(workDay.timeOutAdjusted)
    .style({ numberFormat: "HH:mm" });
  worksheet
    .cell(col, row + 4)
    .date(workDay.durationAdjusted)
    .style({ numberFormat: "HH:mm" });
}
