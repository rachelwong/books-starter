const mongoose = require("mongoose")
// const multer = require('multer')
// const fs = require('fs')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'author'
  },
  // img: {
  // data : Buffer,
  // required: true,
  // }
})

const BookModel = mongoose.model("book", BookSchema)

module.exports = {
  BookModel,
  BookSchema
}