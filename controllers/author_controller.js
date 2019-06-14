const {
    AuthorModel
} = require("../models/author_model")
const {
    BookModel
} = require("../models/book_model")

async function create(req, res) {
    //logic for creating a new resource

    const image = req.file.path.replace('public', '')
    let {
        name,
        bio,
        gender
    } = req.body
    let author = await AuthorModel.create({
            name,
            bio,
            gender,
            image
        })
        .catch(err => res.status(500).send(err))
    res.redirect("/authors")
}

async function index(req, res) {
    //show a listing of all resources 
    let authors = await AuthorModel.find()
    res.render('layout', {
        view: 'author/index',
        title: 'All Authors',
        authors
    })
    //res.render("author/index", {authors})
}

async function show(req, res) {
    let author = await AuthorModel.findById(req.params.id)
    let books = await BookModel.find({
        author: req.params.id // criteria
    })
    res.render('layout', {
        view: 'author/show',
        title: 'Author',
        author,
        books
    })
}

async function edit(req, res) {
    let author = await AuthorModel.findById(req.params.id) //route to edit includes an id already
    //shows the form to create the resource
    res.render('layout', {
        view: 'author/edit',
        title: 'Edit Author',
        author //the id is passed through to the view here
    })
}

async function update(req, res) {
    // logic for posting/updating new data to an existing resource
    let {
        name,
        bio,
        gender
    } = req.body
    //use the id to identify the author and update the fields with what is passed in through req.body
    let author = await AuthorModel.findByIdAndUpdate(req.params.id, {
            name,
            bio,
            gender
        })
        .catch(err => res.status(500).send(err))
    res.redirect("/authors")
}

async function make(req, res) {
    //shows the form to create the resource
    res.render('layout', {
        view: 'author/new',
        title: 'New Author'
    })
    // res.render("author/new")
}

async function destroy(req, res) {
    await AuthorModel.findByIdAndRemove(req.params.id)
    res.redirect("/authors")
}
module.exports = {
    create,
    index,
    make,
    show,
    destroy,
    edit,
    update,
}