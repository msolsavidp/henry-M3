    const commands = require ('./commands')

    const print = function (output){
      process.stdout.write(output);
      process.stdout.write('\nprompt > ');
    }
    
    // Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {

      var args = data.toString().trim().split(' '); // remueve la nueva línea

      let cmd = args.shift();


      if (commands[cmd]){
        commands[cmd](args, print);
      } else {
        //command not found
        print('cmd not found')
      };
      //  NO ES ESCALABLE
      // if (cmd === 'echo'){
      //   process.stdout.write(args.join(' '));
      // } else if (cmd === 'date'){

      // } else if (cmd==='ls'){

      // } else if (cmd = 'pwd'){

      // } else {
      //   process.stdout.write('command not found')
      // }

      // process.stdout.write('You typed: ' + cmd);
      // process.stdout.write('\nprompt > ');
    });