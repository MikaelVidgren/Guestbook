const PORT = process.env.PORT || 3000;
var http = require("http");
var express = require("express");
const { sendFile } = require("express/lib/response");
var app = express();
var fs = require("fs");


app.use(express.static(__dirname + "/"));


//Route Homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//Route Guestbook
app.get("/guestbook", function (req, res) {

  var data = require("./data.json");

  var results = '<table border="100"> ';

  for (var i = 0; i < data.length; i++) {
    results +=
    
      "<tr>" +
     // "<td>" + data[i].id + "</td>" +
      "<td>" + data[i].username + "</td>" +
      "<td>" + data[i].country + "</td>" +
      "<td>" + data[i].message + "</td>" +
      "<td>" + data[i].date + "</td>" + 
      "</tr>";
  }
  res.send(results);
  //filler

});
//Route
app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/newmessage.html");
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/newmessage", function (req, res) {
    var data = require(__dirname + "/data.json");

    data.push({
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        date:  Date(),
      });

      var jsonStr = JSON.stringify(data);

      fs.writeFile("data.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("Tiedot tallennettu");
      });
      res.send("Viestisi on tallennettu. Tarkastele viestiäsi osoitteessa: http://localhost:8080/guestbook tai palaa etusivulle: http://localhost:8080 ");
    });



//Route Error 404
app.get("*", function (req, res) {
  res.send("404 - Sivua ei ole");
    
  });




app.listen(3000, function () {
  console.log("Kuuntelee 3000 (Taika-portti)");
});
