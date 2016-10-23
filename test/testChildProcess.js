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

console.log('wating a second for child creation.');

setTimeout( () => {
  console.log('Parent PID', process.pid);
  console.log('child PID:', child.pid);
  console.log('life time of child:',timeOfLife,'s');
  console.log('please verify with htop!');
},1000);

// forever
setInterval(() => {}, 2000);
