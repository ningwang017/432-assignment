var express = require('express');
var router = express.Router();
var app = express();
const fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.writeHead(200, {'content-type': 'text/html'});
  fs.readFile('index.html', 'utf-8', (err, data) => {
    if(err) {
      res.end('Could not find or open file for reading\n');
    } else {
      res.end(data);
    }
  })
});



module.exports = router;
