const express = require("express")
const router = express.Router()
const AuthorController = require("./controllers/author_controller")

router.get("/", AuthorController.index)

router.get("/new", AuthorController.make)

router.get("/:id", AuthorController.show)

router.post("/", AuthorController.create)

router.delete("/:id", AuthorController.destroy)

module.exports = router