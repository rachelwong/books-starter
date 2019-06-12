const {
    BookModel
} = require("../models/book_model")
const {
    AuthorModel
} = require("../models/author_model")

async function create(req, res) {
    // logic for creating a resource
    let {
        title,
        published,
        author
    } = req.body
    let book = await BookModel.create({
            title,
            published,
            author
        })
        .catch(err => res.status(500).send(err))

    res.redirect("/books") // we can change the redirect to the page that we just created
}

async function index(req, res) {
    //showed a list of all the resources
    let books = await BookModel.find().populate('author')

    res.render('layout', {
        view: 'book/index',
        title: 'All Books',
        books
    })
    // res.render("book/index", {books})
}

async function show(req, res) {
    // req.params.id is to get the id from the request object
    // the populate method go to  database use id in thpopulate field nad fethc object and insert into the book instead of just the id 
    let book = await BookModel.findById(req.params.id).populate('author')
    res.render('layout', {
        view: 'book/show',
        title: 'Book',
        book // returning only the book that we are looking for by id
    })
}

async function make(req, res) {
    //shows the form to create the resource
    const authors = await AuthorModel.find()
    res.render('layout', {
        view: 'book/new',
        title: 'New Book',
        authors // create a list of all authors so that you can create a new book by choosing from a list of existing authors
    })
    // res.render("book/new")
}

async function destroy(req, res) {
    await BookModel.findByIdAndRemove(req.params.id)
    res.redirect("/books")
}

module.exports = {
    create,
    index,
    make,
    show,
    destroy
}