const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const PORT = 5678;

const { getSeats } = require("./handlers");

var app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(require("./routes"));
app.use(bodyParser.json());

app.get("/seats", getSeats);

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
