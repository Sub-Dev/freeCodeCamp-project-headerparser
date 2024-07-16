// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var useragent = require('express-useragent'); // Certifique-se de importar o módulo aqui

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Middleware para capturar informações do User-Agent
app.use(useragent.express());

app.get('/api/whoami', (req, res) => {
  // Capturar o IP do usuário
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // Capturar informações do User-Agent
  const userAgent = req.useragent;
  // Capturar o idioma do cabeçalho Accept-Language
  const language = req.headers['accept-language'];
  // Construir a resposta
  const userInfo = {
    ipaddress: ip,
    language: language,
    browser: userAgent.browser,
    version: userAgent.version,
    software: userAgent.os,
    platform: userAgent.platform,
    source: userAgent.source,
  };

  res.json(userInfo);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
