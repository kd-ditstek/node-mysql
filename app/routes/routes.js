const express = require("express");
const postRoute = express.Router();

const {listPost, insertPost, getPostById, updatePost, deletePost, createCat} = require('../controller/test.js');
const { request } = require("../../index.js");


//create category
postRoute.post('/createCat', async(req, res) => {
    const title = req.body.title;
    const request = {title}
    if (!title) {
        return res.sendStatus(400);
     }
    await createCat(request).then(() => res.json({message: "Category Created"}) );
})
postRoute.get('/', async(req, res) => {
    try{
        const post = await listPost();
        res.status(200).json({post: post});
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

postRoute.param('postId', async(req, res, next, postId) => {
    try{
        const post = await getPostById(postId)
        req.post = post;
        next();
    }catch(err){
        res.statusCode(500)
    }
})

postRoute.get('/:postId', async(req, res, next)=>{
    res.status(200).json({post: req.post})
})

postRoute.post('/create', async(req, res, next) => {
    try{
        const title = req.body.title;
        const description = req.body.desc;
        const catId = req.body.catId;
        const request = {title, description, catId}
        if (!title || !description || !catId) {
            return res.sendStatus(400);
         }
        await insertPost(request).then(() => res.json({message: "Post Created"}) );
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

postRoute.put('/:postId', async(req, res, next)=>{
    try{
        const title = req.body.title;
        const description = req.body.desc;
        const postId = req.params.postId;
        const catId = req.body.catId;

        if(!title || !description || !postId || !catId){
            return res.sendStatus(400);
        }
        const request = {title, description, catId}
        
        const post = await updatePost(request, postId).then(() => { 
            res.status(200).json({"message" : 'Post updated.'})
         })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

postRoute.delete('/:postId', async(req, res, next) => {
    try{
        const  postId = req.params.postId;
        const response = await deletePost(postId);
        res.status(200).json({"message" : 'Post deleted.'})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})



module.exports = postRoute;
