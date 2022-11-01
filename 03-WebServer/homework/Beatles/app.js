var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
];

http.createServer(function(req, res){
  if (req.url ==='/api' || req.url === '/api/'){
    res.writeHead(200, { 'Content-Type':'application/json'});
    res.end(JSON.stringify(beatles));
  }; 

  if (req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/html'})
    var html = fs.readFileSync(`${__dirname}/index.html`);
    res.end(html);
  };

  if (req.url.substring(0,5) === '/api/' && req.url.length > 5) {
    let findBeatle = req.url.split('/').pop();
    let foundBeatle = beatles.find((beatle) => findBeatle === encodeURI(beatle.name));
    if (foundBeatle){
      // res.writeHead(200, {'Content-Type':'application/json'});
      // res.end(JSON.stringify(foundBeatle));
      res.writeHead(200, {'Content-Type':'application/json'})
      res.end(JSON.stringify(foundBeatle));
    } else {
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('No existe ese Beatle');
    }
  };
  


  if (req.url.substring(0,5) === '/api/' && req.url.length > 5) {
    let findBeatle = req.url.split('/').pop();
    let foundBeatle = beatles.find((beatle) => findBeatle === encodeURI(beatle.name));
    console.log(foundBeatle)
    if (foundBeatle){
      // res.writeHead(200, {'Content-Type':'application/json'});
      // res.end(JSON.stringify(foundBeatle));
      res.writeHead(200, {'Content-Type':'text/html'})
      let html = fs.readFileSync(__dirname+ '/beatle.html', 'utf8');
      html = html.replace(/{name}/g, foundBeatle.name);
      html = html.replace('{birthdate}', foundBeatle.birthdate);
      html = html.replace('{profilePic}', foundBeatle.profilePic);

      //let finalHTML = replaceData(read, foundBeatle); --OTRA FORMA
      res.end(html);
    } else {
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('No existe ese Beatle');
    }
  }
}).listen(1337, '127.0.0.1');





// http.createServer(function(req, res){
//   if (req.url ==='/api' || req.url === '/api/'){
//     res.writeHead(200, { 'Content-Type':'application/json'});
//     res.end(JSON.stringify(beatles));
//   } else if (req.url === `/api/${req.url}`){
//     (err, data) => {
//       if(err){
//         res.writeHead(400, {'Content-Type':'text/plain'});
//         res.end('Hubo un error')
//       }
//       else {
//         res.writeHead(200, {'Content-Type':'application/json'});
//         var obj = beatles['name'][req.url]
//         res.end(JSON.stringify(obj))
//       }
//     }
//   }
// }).listen(1337, '127.0.0.1');