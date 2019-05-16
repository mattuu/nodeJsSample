import excel from "excel4node";

export default function handle(timesheet, callback) {
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Sheet 1");

  // Create a reusable style
  var style = workbook.createStyle({
    font: {
      color: "#FF0800",
      size: 12
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -"
  });



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

  workbook.write("Excel.xlsx");

  callback();
}
