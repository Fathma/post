const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: { type:String, required:true },
    body: { type:String, required:true },
    likes: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'Author' },
        }
    ],
    comments: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'Author' },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],
    image: { type: String},
    date: { type: Date, default:Date.now }
})

module.exports = mongoose.model('Post', PostSchema, 'posts')

