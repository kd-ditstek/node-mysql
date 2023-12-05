const db = require('../../app/db.js');
const Category = require('../model/category.js');
const Post = db.Post;
module.exports ={
    insertPost,
    listPost,
    getPostById,
    updatePost,
    deletePost,
    createCat
}

async function createCat(request){
    await Category.create(request)
}
async function listPost(){
    const post = await Post.findAll({ include: [Category] });
    return post;
}

async function insertPost(request){
    await Post.create(request)
}

async function getPostById(id){
    const post = await Post.findByPk(id, { include: [Category] });
    return post;
}

async function updatePost(request, id){
    await Post.update(request, {where : {id, id} });
}

async function deletePost(id){
    const post = await getPostById(id);
    console.log(post)
    await post.destroy();
}