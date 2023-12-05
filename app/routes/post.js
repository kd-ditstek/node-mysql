const express = require("express");
const postRoute = express.Router();

const {listPost, insertPost} = require('../controller/test.js');

postRoute.get('/', async(req, res) => {
    try{
        const post = await listPost();
        res.status(200).json({post: post});
    }catch(err){
        res.sendStatus(500)
    }
})

postRoute.post('/create', async(req, res, next) => {
    try{
        const title = req.body.title;
        const description = req.body.desc;
        const request = {title, description}
        if (!title || !description) {
            return res.sendStatus(400);
         }
        await insertPost(request).then(() => res.json({message: "Post Created"}) );

        res.status(200).json({post: post});
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = postRoute;
