const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const User = require('./models/User')


// Serve up static assets (usually on heroku)
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./models');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('clinet/build'));
}

mongoose.connect(proces.env.MONGODB_URI);

var MONGODB_URI = process.env.MONGODB_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

const configurePassport = require('./controllers/passport')
const passport = configurePassport(app, mongoose, User)

app.use(routes(passport, User));

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
