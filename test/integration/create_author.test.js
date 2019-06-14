const supertest = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
beforeAll(() => {
  mongoose.connect("mongodb://localhost/test_books_r_us", {
    useNewUrlParser: true
  })
})

// Tear down
afterAll(() => {
  mongoose.connection.close()
})

describe("The user creates a new author", () => {
  test("POST /authors with valid req body", async () => {
    // Test what is valid in here
    // make this request as if we are making it from the browser 
    // This call supertest and simulate whatever operations we want (user actions) and then we will get a resposne from that as if we submitted from the browser. 
    const response = await supertest(app)
      .post("/authors")
      .send({
        // what we send in as if it was posted in a form 
        name: "Garrett",
        bio: "my bio",
        gender: "male",
      }).expect(200) // expecting the 302 response code which means it has been completed successfully 
  })
})