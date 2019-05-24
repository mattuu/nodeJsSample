import excel from "excel4node";
import { cpus } from "os";

export default function write(timesheet, response) {
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Sheet 1");

  const styleTime = workbook.createStyle({
    font: {
      size: 12
    }
  });
  // Create a reusable style

  let row = 1;
  timesheet.workWeeks.forEach(ww => {
    writeWorkWeek(worksheet, ww, row, 1);
    row += 6;
  });

  return workbook.write("ExcelFile.xlsx", response);
}

function writeWorkWeek(worksheet, workWeek, row, col) {
  worksheet.cell(row + 1, col).string("start");
  worksheet.cell(row + 2, col).string("break");
  worksheet.cell(row + 3, col).string("end");
  worksheet.cell(row + 4, col).string("duration");

  col++;

  workWeek.days.forEach(wd => {
    writeWorkDay(worksheet, wd, row, col);
    col++;
  });
}

function writeWorkDay(worksheet, workDay, row, col) {
  worksheet
    .cell(row, col)
    .date(workDay.date)
    .style({ numberFormat: "dd-MMM" });

  // worksheet
  //   .cell(col, row)
  //   .date(workDay.date)
  //   .style({ numberFormat: "dd-MMM" });

  // if (workDay.timeIn) {

  if (workDay.timeIn) {
    worksheet
      .cell(row + 1, col)
      .date(workDay.timeInAdjusted)
      .style({ numberFormat: "hh:mm" });

    worksheet
      .cell(row + 2, col)
      .date(workDay.totalBreaksAdjusted)
      .style({ numberFormat: "hh:mm" });

    worksheet
      .cell(row + 3, col)
      .date(workDay.timeOutAdjusted)
      .style({ numberFormat: "hh:mm" });

    worksheet
      .cell(row + 4, col)
      .formula(
        `${excel.getExcelCellRef(row + 3, col)}-${excel.getExcelCellRef(
          row + 1,
          col
        )}`
      );
      // .string(excel.getExcelCellRef(row + 3, col) - );
      // .style({ numberFormat: "hh:mm" });
  }
}
