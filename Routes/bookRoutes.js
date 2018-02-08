const express = require('express');

const routes = function(Book) {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .post(function(req, res) {
      let book = new Book(req.body);

      book.save(); // Saves the new book into MongoDB
      res.status(201).send(book); // Sends back a Status to notify a new resource has beencreated and the new Book record
    })
    .get(function(req, res) {
      let query = {};

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

  bookRouter.use('/:bookId', function(req, res, next) {
    Book.findById(req.params.bookId, function(error, book) { // Use the findById moongoose method and pass in the query parameter
      if(error) {
        res.status(500).send(error); // Responds with an error status code and the error messsage
      } else if (book){
        req.book = book; // Set request book to the book that was found
        next(); // Call the next(callback) function
      } else {
        res.status(404).send('no book found'); // Return Status 404 if book isn't found
      }
    });
  });

  bookRouter.route('/:bookId') // Must use colon
    .get(function(req, res) {
      res.json(req.book); // Respond with the book that was found during the Middleware
    })
    .put(function(req, res) {
      // Update the entire record to these properties
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;

      req.book.save(function(err) { // Save the changes and Asynchronously respond with book
        if(err) {
          res.status(500).send(err)
        } else {
          res.json(req.book);
        }
      });
    })
    .patch(function(req, res) {
      // Avoid malicious behavior
      if(req.body._id) { // If trying to change the ID
        delete req.body._id; // Delete that change off the request body
      }
      // Update only specific properties of a record
      for(var p in req.body) { // For every p(property) in req.body
        if(req.body[p]) { // If that p exist on the req.body object
          req.book[p] = req.body[p]; // Change book's property to the value of p
        }
      }

      req.book.save(function(err) { // Save the changes and Asynchronously respond with book
        if(err) {
          res.status(500).send(err)
        } else {
          res.json(req.book);
        }
      });
    })
    .delete(function(req, res) {
      req.book.remove(function(err) {
        if(err) {
          res.status(500).send(err)
        } else {
          res.status(204).send('Removed') // Respond with Status code 204(i.e No content)
        }
      });
    });

  return bookRouter
};

module.exports =  routes;
