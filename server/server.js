var express = require("express");
var fetch = require("node-fetch");

var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.static("public"));

app.get("/fin-data", function(req, res) {
  var urls = [
    "http://localhost:8081/positions.json",
    "http://localhost:8081/financial_units.json"
  ];
  Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    .then(([pos, units]) => {
      const positions = pos.positions.map(position => {
        const [unit] = units.finUnits.filter(
          finUnit => finUnit.id === position.fuOriginId
        );
        return {
          financialName: unit.name,
          notionalValue: position.data.currency.notionalValue,
          currencyCode: position.data.currency.ccy
        };
      });
      return positions;
    })
    .then(positions => {
      res.send(JSON.stringify(positions));
    })
    .catch(err => console.error(err));
});

var server = app.listen(8081, function() {
  var port = server.address().port;
  console.log("Example app listening on port: ", port);
});
