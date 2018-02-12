const express = require('express'); // Require Express
const mongoose = require('mongoose'); // Require Mongoose
const bodyParser = require('body-parser'); // Require Body Parser

let db;
if(process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/bookAPI_test'); // Connect to the test database; If it doesn't exist, it'll create one
} else {
  db = mongoose.connect('mongodb://localhost/bookAPI'); // Connect to the production database; If it doesn't exist, it'll create one
}

const Book = require('./models/bookModel'); // Require the book model created in the models directory

const app = express();

const port = process.env.PORT || 3000;

// .use() Is a Middleware loader for your Express app
app.use(bodyParser.urlencoded({extended: true})); // (Middleware)
app.use(bodyParser.json()); // (Middleware) Parses a Post Request Body into a JSON object

// Needs to be executed because it's exported as a function, Book is injected
const bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function() {
  console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app;