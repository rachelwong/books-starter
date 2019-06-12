const {
    AuthorModel
} = require("../models/author_model")

async function create(req, res) {
    let {
        name,
        bio,
        gender
    } = req.body
    let author = await AuthorModel.create({
            name,
            bio,
            gender
        })
        .catch(err => res.status(500).send(err))

    res.redirect("/authors")
}

async function index(req, res) {
    let authors = await AuthorModel.find()
    res.render('layout', {
        view: 'author/index',
        title: 'All Authors',
        authors
    })
}

async function show(req, res) {
    let author = await AuthorModel.findById(req.params.id)

    let books = await BookModel.find(author._id)

    res.render('layout', {
        view: 'author/show',
        title: 'Author',
        author,
        books
    })
}

// async function update(req, res) {
// let {
//     name,
//     bio,
//     gender,
// } = req.body
// let book = await AuthorModel.findOneAndUpdate({
//         name,
//         bio,
//         gender
//     })
//     .catch(err => res.status(500).send(err))
// res.redirect("/author" + req.params.id) // redirect back to show one author 
// }

function make(req, res) {
    res.render('layout', {
        view: 'author/new',
        title: 'New Author'
    })
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
    //update
}