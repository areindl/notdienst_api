"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const crawler = require("../crawler");

/// Crawling Target
const url =
  "http://www.lak-bayern.notdienst-portal.de/blakportal/schnellsuche/ergebnis";

let params = {
  lat: 47.52838000000001,
  lon: 11.1113161,
  date: Date.now(),
  location: "Farchant",
};

let result = {};

const router = express.Router();

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Notdienst API für deutsche Apotheken</h1>");
  res.end();
});
router.get("/notdienst", (req, res) => {
  // Get Results by crawling and parsing
  this.result = crawler
    .getResults(url, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      console.error("Crawling/Parsing failed");
      return err;
    });

  res.json(result);
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => {
  res.json(this.result);
});

module.exports = app;
module.exports.handler = serverless(app);
