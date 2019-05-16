const app = (module.exports = require("express")());
const path = require("path");
const { handle } = require("../services").fileUploadHandler;

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/index.html"));
});

app.post("/file", (req, res) => {
  handle(req, data => {
    res.send(data);
  });
});
