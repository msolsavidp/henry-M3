const { application } = require('express');
const { server } = require('./server.js');
const { posts } = require('./server.js');



server.post('/posts/author/:author', (req, res, next)=>{

});

server.get('/posts', (req, res, next)=>{
    let {term} = req.query;
    if (term) return term;
    else return posts
});

server.get('/posts/:author', (req, res, next) => {
    let {name} = req.params;
});

server.get('/posts/:author/:title', (req, res, next) => {

});

server.put('/posts', (req, res, next)=>{

})

server.delete('/posts', (req, res, next)=>{
    
})

server.listen(3000, ()=> console.log('listening on port 3000'));
