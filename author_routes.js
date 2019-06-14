const express = require("express")
const router = express.Router()
const AuthorController = require("./controllers/author_controller")
const multer = require('multer')
const path = require('path')
// const upload = multer({
//   dest: 'public/images'
// })
// customise the file name
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname))
  }
}) // configure how multer store files
const upload = multer({
  storage
})
router.get("/", AuthorController.index)

router.post("/", upload.single('image'), AuthorController.create)

router.get("/new", AuthorController.make)

router.get("/:id", AuthorController.show)

router.delete("/:id", AuthorController.destroy)

router.get("/:id/edit/", AuthorController.edit) // to show the updates

router.put("/:id/edit", AuthorController.update) // to update. post for creating a new entity. put is for editing an existing entry. 

module.exports = router