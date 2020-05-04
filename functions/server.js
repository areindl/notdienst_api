const crawler = require("./crawler.js");

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

  results = await crawler.getResults(url, params);

  if (results.length) {
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify("Error while fetching data."),
    };
  }
};
