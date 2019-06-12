const { AuthorModel } = require("../models/author_model")

async function create(req, res) {
    //logic for creating a resource
    let {name, bio, gender} = req.body
    let author = await AuthorModel.create({ name, bio, gender })
        .catch(err => res.status(500).send(err))

    res.redirect("/authors")
}

async function index(req, res) {
    //showed a list of all the resources
    let authors = await AuthorModel.find()
    res.render('layout', {
        view: 'author/index',
        title: 'All Authors',
        authors
    })
    // res.render("author/index", {authors})
}

function make(req, res) {
    //shows the form to create the resource
    res.render('layout', {
        view: 'author/new',
        title: 'New Author'
    })
    // res.render("author/new")
}


module.exports = {
    create,
    index,
    make
}