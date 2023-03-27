// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

const PORT = process.env.PORT || 43135;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  if (req.params.date) {
    if (Number(req.params.date)) {
      const date = new Date(Number(req.params.date));
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    } else {
      const date = new Date(req.params.date);
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  } else {
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
