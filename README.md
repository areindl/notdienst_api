# Apotheken Notdienst Crawler

### A simple crawler in Node.js to build an API to get the current emergency pharmacies for a given location in Germany directly from [BLAK](http://www.lak-bayern.notdienst-portal.de/blakportal/). I needed that quickly for a small project.

## Introduction

This repository contains code for a web crawler that scrapes a website. The API can be pubslished using a serverless lambda functions at hosters like [Netlify](https://netlify.com).

Comes with absolutely no warranty, API is subject to change and it needs refactoring / sanity measures. Use on your own risk.

## Installation

Clone the repository

Install dependencies: `npm install`

This project was built with the following tools:

- Node: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Axios: A promised based HTTP client for the browser and Node.js.
- Cheerio: A lightweight implementation of jQuery which provided access to the DOM on the server.

## Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/da8504ad-186a-4f5c-87fb-0157eb027a0b/deploy-status)](https://app.netlify.com/sites/apotheken-notdienst-api/deploys)

I deployed the API using [Netlify](https://docs.netlify.com/functions/build-with-javascript/#format)'s serverless functions:

- https://apotheken-notdienst-api.netlify.app/.netlify/functions/server

- Query Parameters:

  - `lat` | Latitude
  - `lon` | Longitude
  - `date` | UNIX Timestamp

- Example for Munich on 05.05.2020: https://apotheken-notdienst-api.netlify.app/.netlify/functions/server?lat=48.135124&lon=11.581981&date=1588702203721

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Credits

Thanks to [this](https://blog.logrocket.com/how-to-build-a-web-crawler-with-node/) tutorial by [Logrocket](https://logrocket.com).
