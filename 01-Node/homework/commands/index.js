let fs = require ('fs');
let request = require ('request');

module.exports = {
    echo: function(args, print){
        print(args.join(' '));
    },

    date: function(args, print){
        print(Date());
    },

    ls: function(args, print){
        fs.readdir('.', function(err, files){
            if (err) throw err;
            //aca uno todos los elementos del array y los separo por un enter el \n es un enter
            print(files.join('\n'))
        })
    },
    //devuelve el path absoluto del archivo print working directory
    pwd: function(args, print){
        print(process.cwd());
    },
    
    cat: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if (err) throw err;
            print(data);
        })
    },
//Busca leer las primeras lineas
    head: function(args, print){
        fs.readFile (args[0], 'utf8', function(err, data){
            fs.readFile(args[0], 'utf8', function(err,data){
                if (err) throw err;
                let lines = 10;
                if (args[1]) lines= args[1];
                print(data.split('\n').splice(0, args[1]).join('\n'))//empezá en 0 y eliminá 10 elementos
            })
        })
    },
//Busca leer las ultimas
    tail: function(args, print){
        fs.readFile(args[0], 'utf8', function(err,data){
            if(err) throw err;
            print(data.split('\n').splice(-args[1]).join('\n'));
        })
    },

    curl: function(args,print){
        request(args[0], 'utf8', function(err,data){
            if(err) throw err;
            print(data.body)
        })
    }
}