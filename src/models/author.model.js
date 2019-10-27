const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    name: { type: String },
    email: { type:String, required:true },
    password: { type: String },
    role: { type: String},
   
    verified: { type: Boolean, default:false }
})

module.exports = mongoose.model('Author', AuthorSchema, 'users')

