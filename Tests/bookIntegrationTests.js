const should = require("should");
const request = require("supertest");
const app = require('../app.js');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const agent = request.agent(app);


describe('Book CRUD Test', function() {
  it('Should allow a book to be posted and return a read and _id', function(done) {
    let bookPost = {title: 'New Book', author: 'Steven', genre: 'Fiction'};

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function(err, results) {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      })
  })

  afterEach(function(done) {
    Book.remove().exec();
    done();
  })
})
