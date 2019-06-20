//Install express server
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/clickmeeting-rec-app"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/clickmeeting-rec-app/index.html"));
});

app.post("/figure", function(req, res) {
  const val = req.body;

  fs.readFile(
    path.join(__dirname + "/src/assets/data/figures.json"),
    "utf8",
    function(err, file) {
      file = JSON.parse(file);
      file.push({
        figure: val.fName.name,
        calc: [
          {
            type: val.cType,
            exp: val.exp
          }
        ]
      });

      fs.writeFile(
        path.join(__dirname + "/src/assets/data/figures.json"),
        JSON.stringify(file),
        function(err) {
          res.status(200).json(file);
        }
      );
    }
  );
});

app.put("/figure", function(req, res) {
  const val = req.body;

  fs.readFile(
    path.join(__dirname + "/src/assets/data/figures.json"),
    "utf8",
    function(err, file) {
      file = JSON.parse(file);

      file = file.map(f => {
        if (f.figure === val.fName.name) {
          f.calc.push({
            type: val.cType,
            exp: val.exp
          });
        }
        return f;
      });

      fs.writeFile(
        path.join(__dirname + "/src/assets/data/figures.json"),
        JSON.stringify(file),
        function(err) {
          res.status(200).json(file);
        }
      );
    }
  );
});

// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is listening at http://%s:%s", host, port);
});
