const should = require("should");
const sinon = require("sinon");

describe("Book Controller Tests:", function() {
  describe("Post", function() {
    it("should not allow an empty title on post", function() {
      let Book = function(book) {
        this.save = function() {};
      };

      let req = {
        body: {
          author: "Steven"
        }
      };

      let res = {
        // Create a spy that records values
        status: sinon.spy(),
        send: sinon.spy()
      };

      // Call a Post request
      const bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res); // Call a post request using req, res

      // Assertions
      res.status.calledWith(400).should.equal(true, "Bad Status " + res.status.args[0][0]);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
