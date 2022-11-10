// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

const PATH = '/posts';
let id = 0;
// TODO: your code to handle requests

server.post(PATH, (req, res, next)=>{
    const {author, title, contents} = req.body;
    console.log(author, title, contents);
    if (!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        //.json especifica el content type como que es un json, si uso send lo manda como text
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }

    const post = {author, title, contents, id: id++};
    posts.push(post);
    res.status(200).json(post)
}); 


server.post(`${PATH}/author/:author`, (req, res)=>{
    const {title, contents} = req.body;
    const {author} = req.params;
    console.log(title, contents, author);
    if (!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }

    const post = {author, title, contents, id: id++};
    posts.push(post);
    res.json(post)
});

server.get(PATH, (req,res) => {
    let {term} = req.query;
    if (term){
    const term_posts = posts.filter(p => p.title.includes(term) || p.contents.includes(term));
    return res.json(term_posts)
    } else {
        res.json(posts)
    }
});

server.get(`${PATH}/:author`, (req, res)=>{
    let {author} = req.params;
    const author_posts = posts.filter(p => p.author===author);
    if(author_posts.length > 0){
    res.json(author_posts)
    } else {
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
});

server.get(`${PATH}/:author/:title`, (req, res)=>{
    let {author, title} = req.params;
    
        const filteredposts = posts.filter((p) => p.author===author && p.title===title);
        
        if (filteredposts.length > 0){
            res.json(filteredposts)
        } else {
            res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }
});

// server.put(PATH, (req, res)=>{
//     let {id, title, contents} = req.body;
//     console.log(id, title, contents);
//     if (id && title && contents){
//         const id_identified = posts.filter(p=>p.id.includes(id));
//         if (id_identified.length > 0) return res.json({error: "No existe un post con este Id"});
//     }
//     else if (!id || !title || !contents){
//         res.status(400).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
//     }
// })

server.put(PATH, (req, res)=>{
    let {id, title, contents} = req.body;
    if (id && title && contents){
        //find devuelve el primer elemento que encuentra
        console.log(id, title, contents);
        let post = posts.find(p => p.id === parseInt(id));
        if (post){
            post.title=title;
            post.contents = contents;
            res.json(post);
        } else {
            res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho id"})
        }
    } else {
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
});

server.delete(PATH, (req, res)=>{
    let { id } = req.body;
    let post = posts.find(p => p.id === parseInt(id));
    if (!id || !post) {
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }; 
        posts = posts.filter(p => p.id !== parseInt(id));
        res.json({ success: true })
    
});

server.delete('/author', (req, res)=>{
    let {author} = req.body;
    let author_found = posts.find(p => p.author === author);
    if (!author || !author_found) return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
    let deleted_authors = [];
    deleted_authors = posts.filter(p => p.author === author);
    posts = posts.filter(p => p.author !== author);

    res.json(deleted_authors);
})


module.exports = { posts, server };
