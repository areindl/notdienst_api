const crawler = require("../crawler");

exports.handler = async (event) => {
  const lat = event.queryStringParameters.name || 45;

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

  result = crawler
    .getResults(url, params)
    .then((res) => {
      return {
        statusCode: 200,
        body: res,
      };
    })
    .catch((err) => {
      console.error(err);
      console.error("Crawling/Parsing failed");
      return {
        statusCode: 500,
        body: "Could not load API",
      };
    });
};
