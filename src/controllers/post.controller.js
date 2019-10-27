
const Post = require('../models/post.model')


exports.create= (req, res)=>{
    req.body.author = req.user._id
    new Post(req.body).save().then(post=>{
        res.json({msg: 'successful!', post_id: post._id})
    })
}

exports.allposts = async (req, res)=>{
    let posts =await Post.find()
    if(posts){
        res.json(posts)
    }
}