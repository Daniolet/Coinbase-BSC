
//Install express server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const userDataPath = path.join(__dirname+'/public/users.md');

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// Serve only the static files form the dist directory
app.use(express.static(__dirname));

var corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Headers'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}
app.options('*',cors());
app.use(cors(corsOptions));

app.post('/update', function(req, res) {
  fs.appendFile(userDataPath, JSON.stringify(req.body) + '\n' , function(err) {
    res.sendStatus(200);
    console.log('TOUCH', JSON.stringify(req.body));
  });
})

app.get('/users', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/users.md'));
});

app.get('/', function(req, res) {
    res.end('Hello World! - NEW');
  });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
