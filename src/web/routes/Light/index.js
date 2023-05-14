const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');

const router = Router();

const log = console.log;


router.get('/', (req, res) => {

  //res.sendFile(path.join(__dirname, '/index.html'));
  //res.sendFile(path.join(__dirname, '/scripts.js'));

  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname + " received.");

  res.writeHead(200);

  if(pathname == "/") {
      html = fs.readFileSync(path.join(__dirname, '/index.html'), "utf8");
      res.write(html);
  } else if (pathname == "/script.js") {
      script = fs.readFileSync(path.join(__dirname, '/scripts.js'), "utf8");
      res.write(script);
  }


  res.end();

})

module.exports = router
