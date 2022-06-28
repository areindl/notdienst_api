const dotenv = require("dotenv").config()
const crawler = require("./crawler.js")

exports.handler = async (event) => {
  // CORS

  const cors = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  /// Crawling Target
  const url = process.env.API_URL || "https://www.lak-bayern.notdienst-portal.de/blakportal/schnellsuche/ergebnis"

  // URL PARAMS for Farchant
  let params = {
    lat: event.queryStringParameters.lat || 47.52838000000001,
    lon: event.queryStringParameters.lon || 11.1113161,
    date: parseInt(event.queryStringParameters.date || Date.now()),
  }

  // CHECK VALIDITY OF TIMESTAMP

  let validDate = new Date(params.date).getTime() > 0

  if (!validDate) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Please provide valid timestamp" }),
      headers: {
        ...cors,
        "Access-Control-Allow-Methods": "GET",
      },
    }
  }

  let results = await crawler.getResults(url, params)

  if (results.length) {
    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: {
        ...cors,
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error while fetching data.",
      }),
      headers: {
        ...cors,
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  }
}
