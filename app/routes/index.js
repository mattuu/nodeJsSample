const app = (module.exports = require("express")());

app.get("/", (req, res) => {
  res.redirect(301, "/file");
});

app.use(require("./file"));

app.all("*", (req, res) => {
  res.status(404).send({ msg: "not found", httpStatus: 404 });
});
