const bookController = function(Book) {
  const post = function(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) { // Needs to have title property
      res.status(400);
      res.send("Title is required");
    } else {
      book.save(); // Saves the new book into MongoDB
      // Sends back a Status to notify a new resource has been created and the new Book record
      res.status(201);
      res.send(book);
    }
  };

  const get = function(req, res) {
    const query = {};

    if (req.query.genre) {
      // Enables filtering by passing in the http query parameter only if the query is on genre
      query.genre = req.query.genre;
    }
    Book.find(query, function(error, books) {
      if (error) {
        res.status(500).send(error); // Responds with an error status code and the error messsage
      } else {
        res.json(books); // Responds with the database JSON data
      }
    });
  };

  return {
    post: post,
    get: get,
  };
};

module.exports = bookController;
