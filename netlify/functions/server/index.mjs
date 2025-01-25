import dotenv from "dotenv"
import { getResults } from "./crawler.mjs"

dotenv.config()

export const handler = async (request, context) => {
  try {
    // CORS
    const cors = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    /// Crawling Target
    const url = process.env.API_URL || "https://www.lak-bayern.notdienst-portal.de/blakportal/schnellsuche/ergebnis"

    // URL PARAMS with default for Farchant
    let params = {
      lat: request.queryStringParameters.lat || 47.528381,
      lon: request.queryStringParameters.lon || 11.1113161,
      date: parseInt(request.queryStringParameters.date || Date.now()),
    }

    // Check if lat and lon are valid
    let validLat = params.lat >= -90 && params.lat <= 90
    let validLon = params.lon >= -180 && params.lon <= 180

    if (!validLat || !validLon) {
      throw new Error("Please provide valid latitude and longitude", { statusCode: 400 })
    }

    // CHECK VALIDITY OF TIMESTAMP
    let validDate = new Date(params.date).getTime() > 0

    if (!validDate) {
      throw new Error("Please provide valid timestamp", { statusCode: 400 })
    }

    let results = await getResults(url, params)

    if (!results.length) {
      throw new Error("No results found", { statusCode: 404 })
    }

    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: {
        ...cors,
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: error.message || "Error while fetching data.",
      }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  }
}
