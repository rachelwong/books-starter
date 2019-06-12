const mongoose = require("mongoose")

// create a schema
const BookSchema = new mongoose.Schema({
  // set properties as title, published, author
  title: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    required: true
  },
  author: {
    // this field will be the ID of an object. It is a UID (long hex).
    // setting htis up as foreign key in the collection
    type: mongoose.Schema.ObjectId,
    ref: 'author' //referencing the author model
  }
})

// export the schema because you might use it elsewhere
// references are done through mongoose
const BookModel = mongoose.model("book", BookSchema)

module.exports = {
  BookModel,
  BookSchema
}