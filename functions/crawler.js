"use strict"

const axios = require("axios")
const cheerio = require("cheerio")

//// DATA PARSING

const getResults = (url, params) => {
  // THE RETURN OBJECT
  let results = []
  let promise = new Promise(function (resolve, reject) {
    // Fetch Data
    fetchData(url, params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Starting to Parse...")
          const html = res.data
          const $ = cheerio.load(html)
          const resultEntry = $(".searchResultEntry")

          resultEntry.each(function () {
            let result = {}
            result.name = $(this).find(".name").text()
            result.zip = parseInt($(this).find(".zipCode").text())
            result.street = $(this).find(".street").text()
            result.city = $(this).find(".location").text()
            result.phone = $(this).find(".phone").text()
            result.serviceTime = $(this).find(".serviceTime").text()
            results.push(result)
          })
          resolve(results)
        } else {
          reject("Server returned Bad Status")
        }
      })
      .catch((error) => {
        console.error(error)
        reject("Error crawling BLAK - see logs for details.")
      })
  })

  return promise
}

// CRAWLER
async function fetchData(url, params) {
  console.log("Crawling data...")
  // make http call to url
  let response = await axios({
    method: "POST",
    url: url,
    params: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 12.4; rv:102.0) Gecko/20100101 Firefox/102.0",
    },
  }).catch((err) => {
    console.log(err)
    console.error("Status Code: ", err.response.status)
    console.error("Status Text: ", err.response.statusText)
    return err
  })

  return response
}

/** EXPORTS **/
module.exports = { getResults }
