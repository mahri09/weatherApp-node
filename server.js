const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
require("dotenv").config();

const apiKey = process.env.API_KEY;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", function (req, res) {
  //res.render('index');
  //console.log(req.body.city);
  const city = req.body.city;

  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
  request(url, function (err, response, body) {
    //console.log(response.body);
    if (err) {
      console.log("error:", error);
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      //console.log('body:', body);
      let weather = JSON.parse(body);
      let message = `It's ${weather.current.temperature} degrees in ${weather.location.name}!`;
      console.log(message);
      res.render("index", { weather: message, error: null });
    }
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
