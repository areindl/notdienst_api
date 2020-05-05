const crawler = require("./crawler.js");

exports.handler = async (event) => {
  /// Crawling Target
  const url =
    "http://www.lak-bayern.notdienst-portal.de/blakportal/schnellsuche/ergebnis";

  // URL PARAMS or Farchant
  let params = {
    lat: event.queryStringParameters.lat || 47.52838000000001,
    lon: event.queryStringParameters.lon || 11.1113161,
    date: event.queryStringParameters.date || Date.now(),
  };

  // CHECK VALIDITY OF TIMESTAMP
  let validDate = new Date(params.date).getTime() > 0;

  if (!validDate) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Please provide valid timestamp" }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  }

  let results = await crawler.getResults(url, params);

  if (results.length) {
    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error while fetching data.",
      }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  }
};
