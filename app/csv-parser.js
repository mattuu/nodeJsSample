const parse = (module.exports = require("csv-parse")());

function parseCsv(input, callback) {
  return parse(input, function(err, output) {
    console.log("parse()", input);

    if (err) {
      console.error(err);
      return;
    }
    callback(output);
  });
}

// module.exports = function(input, callback) {
//   parse(input, function(err, output) {
//     console.log("parse()", input);

//     if (err) {
//       console.error(err);
//       return;
//     }
//     callback(output);
//   });
// };
