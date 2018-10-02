// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Timestamp Microservice
app.get('/api/timestamp/:date_string?',(req,res)=>{
  let obj ={"unix":Number,"utc":String};
  let date_str = req.params.date_string;
  if(date_str === null || date_str === undefined){
    let date = new Date();
    obj.unix = date.getTime();
    obj.utc = date.toUTCString();
  }else{
    let date = new Date(isNaN(date_str) ? date_str :parseInt(date_str));
    if(date.getTime() > 0){
      obj.unix = date.getTime();
      obj.utc = date.toUTCString();
    }else{
      res.json({"error" : "Invalid Date" });
    }
  }
  res.json(obj);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});