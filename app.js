const express = require('express');
const mongoose = require('mongoose'); // Require mongoose

const db = mongoose.connect('mongodb://localhost/bookAPI'); // Connect to the database; If it doesn't exist, it'll create one

const Book = require('./models/bookModel'); // Require the book model created in the models directory

const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/Books')
  .get(function(req, res) {
    var query = {};

    if (req.query.genre) { // Enables filtering by passing in the http query parameter only if the query is on genre
      query.genre = req.query.genre;
    }
    Book.find(query, function(error, books) {
      if(error) {
        res.status(500).send(error); // Responds with an error status code and the error messsage
      } else {
        res.json(books); // Responds with the database JSON data
      }
    });
  });

bookRouter.route('/Books/:bookId') // Must use colon
.get(function(req, res) {
  Book.findById(req.params.bookId, function(error, book) { // Use the findById moongoose method and pass in the query parameter
    if(error) {
      res.status(500).send(error); // Responds with an error status code and the error messsage
    } else {
      res.json(book); // Responds with a book's JSON data which matches a specific ID
    }
  });
});

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function() {
  console.log('Server running on PORT: ' + port);
});
