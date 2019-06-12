const express = require("express")
const router = express.Router()
const AuthorController = require("./controllers/author_controller")

router.get("/", AuthorController.index)

router.post("/", AuthorController.create)

router.get("/new", AuthorController.make)

router.get("/:id", AuthorController.show)

//router.put("/:id", AuthorController.update)

router.delete("/:id", AuthorController.destroy)

module.exports = router