
const Post = require('../models/post.model')


exports.create= (req, res)=>{
    req.body.author = req.user._id
    new Post(req.body).save().then(post=>{
        res.json({msg: 'successful!', post_id: post._id})
    })
}

exports.allposts = async (req, res)=>{
    console.log("sdfsd")
    let posts =await Post.find()
    if(posts){
        res.json(posts)
    }
}

exports.getpostsbyID= async (req, res)=>{ 
   let posts = await Post.find({author: req.params.id})
   res.json(posts)
}

exports.addcomment = async (req,res)=>{
    try{
        let post = await Post.findOne({ _id: req.params.post_id})
        let cmnt = {
            comment: req.body.comment,
            user: req.user._id
        }
        post.comments.push(cmnt)
    
        await new Post(post).save()
        res.json(post)
    }catch(err){
        res.json(err)
    }
}


exports.deletecomment = async (req, res)=>{
    let post = await Post.findOne({_id: req.params.post_id})
    post.comments = post.comments.filter( cmnt=> cmnt._id != req.params.cmnt_id )
    await new Post(post).save()
    res.json(post)
}


exports.addlike = async (req, res)=>{
    let post = await Post.findOne({_id: req.params.post_id})
    post.likes.push({user: req.user._id})
    await new Post(post).save()
    res.json(post)
}