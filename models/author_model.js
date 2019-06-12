const mongoose = require("mongoose")

// create a schema
const AuthorSchema = new mongoose.Schema({
    // set properties as name, bio, gender
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non binary'],
        default: 'non binary'
    }
})

// export the schema because you might us it elsewhere
const AuthorModel = mongoose.model("author", AuthorSchema)

module.exports = {
    AuthorModel,
    AuthorSchema
}