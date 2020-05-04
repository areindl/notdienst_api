# Apotheken Notdienst Crawler

### A simple crawler in Node.js to build a simple API to get the current emergency pharmacy for locations in Germany directly from [BLAK](http://www.lak-bayern.notdienst-portal.de/blakportal/).

## Introduction

This repository contains code for a web crawler that scrapes a website. The API can be pubslished using a Serverless function at hosters like [Netlify](https://netlify.com).

## Installation

Clone the repository
Install dependencies: `npm install`
Navigate into the src directory and run the main thread: `node index.js`

This project was built with the following:

- Node: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Axios: A promised based HTTP client for the browser and Node.js.
- Cheerio: A lightweight implementation of jQuery which gives us access to the DOM on the server.
- Netlify Functions for Serverless Deployment

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Credits

Thanks to [this](https://blog.logrocket.com/how-to-build-a-web-crawler-with-node/) tutorial by [Logrocket](https://logrocket.com).
