const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;


// Serve up static assets (usually on heroku)
const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

mongoose.connect(.env.MONGODB_URI);

var MONGODB_URI = .env.MONGODB_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

const userRouter = require('./routes/User');
app.use('/user', userRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
