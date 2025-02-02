const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const app = express()
const port = 3000

mongoose.connect("mongodb://localhost/books_r_us", {
  useNewUrlParser: true
})
mongoose.connection.on("error", err => console.log(err))

app.set("view engine", "ejs")

// use statements must be before your routes
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}))
app.use('/authors', require("./author_routes"))
app.use('/books', require("./book_routes"))

app.listen(port, () => console.log(`Server is listening on port ${port}`))