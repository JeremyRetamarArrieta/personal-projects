const express = require('express')
const postRouter = express.Router()
const Post = require("../models/post.js")


postRouter.post("/", (req, res, next) => {
    const newPost = new Post(req.body)
    newPost.user = req.user._id
    newPost.save((err, newPost) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPosts)
    })
})


module.exports = postRouter