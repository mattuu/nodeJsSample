const app = (module.exports = require("express")());
const path = require("path");
import handle from "../services/file-upload-handler";

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/index.html"));
});

app.post("/file", (req, res) => {
  return handle(req, res);
});
