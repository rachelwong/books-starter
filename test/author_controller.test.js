const AuthorController = require('../controllers/author_controller')
const mongoose = require('mongoose')
const AuthorModel = require('../models/author_model')
// Set up
beforeAll(() => {
  mongoose.connect("mongodb://localhost/test_books_r_us", {
    useNewUrlParser: true
  })
})

// Tear down
afterAll(() => {
  mongoose.connection.close()
})

describe("AuthorController", () => {
  describe("index()", () => {
    test("calls res.render", async () => {
      // await index(req, res)
      // testing the controller in isolation, even it is part of an express app
      // because we don't have a res object from our route in express, we need to create one for testing purposes
      // because res.render is a method we need to supply a dummy res object
      // mongoose.connect("mongodb://localhost/test_books_r_us", {
      //   useNewUrlParser: true
      // })
      const res = {
        // render: () => {} // it timed out because we provided our own dummy version. Jest has to generate a mock function for us in order to test. 
        render: jest.fn() // mocking
      }
      // we need to have mongo server running, when we call AuthorController.index it will retrieve data from our database because AuthorModel.find is asynchronous. You can pass in an object {}, string "", integer 0 (expected return type). We don't have to explicitly say the type, but a value of some kind 
      AuthorModel.find = jest.fn().mockResolvedValue([]) // mocking promise resolved value, essentially an array (find gets all records out of the database and returns an array of authors/records)
      await AuthorController.index(null, res)
      // you can have multiple expects 
      expect(AuthorModel.find).toBeCalledTimes(1) // simulate the resolution 
      // mongoose.connection.close() // this stops the testing from running continuously. So essentially closes the connection to the database after function/test has completed. 
      expect(res.render).toBeCalled()
    })
  })
})