const {
    BookModel
} = require("../models/book_model")
const {
    AuthorModel
} = require("../models/author_model")

async function create(req, res) {
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
    let books = await BookModel.find().populate('author')

    res.render('layout', {
        view: 'book/index',
        title: 'All Books',
        books
    })
}

async function show(req, res) {
    let book = await BookModel.findById(req.params.id).populate('author')
    res.render('layout', {
        view: 'book/show',
        title: 'Book',
        book
    })
}

// async function update(req, res) {
// let {
//     title,
//     published,
//     author,
//     img
// } = req.body
// let book = await BookModel.findOneAndUpdate({
//         title,
//         published,
//         author
//     })
//     .catch(err => res.status(500).send(err))

// res.redirect("/books" + req.params.id) // redirect back to show one book 
// }

async function make(req, res) {
    const authors = await AuthorModel.find()
    res.render('layout', {
        view: 'book/new',
        title: 'New Book',
        authors
    })
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
    destroy,
    // update
}