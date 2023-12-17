// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date?", (req, res) => {
  let date = req.params.date
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  const unixFomat = /^\d+$/ 
  let date_unix = 0;
  let date_yyyymmdd = "";

  let currentDateSet = false;
  if (!date)
  {
    date = new Date().toGMTString();
    currentDateSet = true;
  }

  if (dateFormat.test(date) || currentDateSet)
  {
    date_yyyymmdd = date;
    date_unix = Date.parse(date)/1000;
  } else if (unixFomat.test(date)) {
    date_unix = parseInt(date);
    date_yyyymmdd = new Date(parseInt(date_unix)).toGMTString();
  }
  else {
    res.json({error: "Invalid Date"});
    return;
  }

  res.json({unix: date_unix, utc: date_yyyymmdd});
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
  console.log(`Server is running at http://localhost:${listener.address().port}`);
});
