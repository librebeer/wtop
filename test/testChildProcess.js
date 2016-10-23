/*
 * This test create a child process which spawn new NodeJS instance
 * that is an independent process with a code that does nothing
 * the IMPORTANT_PART is that PRINT parent and children PIDs
 * please verify with htop or something like that.
*/

const fork = require('child_process').fork;

// life time of child in seconds only for test
var timeOfLife = 60;

// create child that does nothing
var child = fork(__dirname + '/child.js' , [timeOfLife]);

child.on('message', function(payload){
    console.log(payload.memUsage);
    payload.memUsage.rss
    var mem = payload.memUsage.rss;
    console.log(mem + " Bits");
    console.log(mem/1024 + " Bytes");
    console.log((mem/1024)/1024 + " MB");
});



console.log('wating a second for child creation.');

setTimeout( () => {
  //pedimos el uso de memoria.
  child.send('get_mem_usage');

  console.log('Parent PID', process.pid);
  console.log('child PID:', child.pid);
  //console.log(child.memoryUsage());
  //console.log(process.memoryUsage());  
  console.log('life time of child:',timeOfLife,'s');
  console.log('please verify with htop!');
},1000);

// forever
setInterval(() => {}, 2000);


