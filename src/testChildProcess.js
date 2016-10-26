/*
 * This test create a child process which spawn new NodeJS instance
 * that is an independent process with a code that does nothing
 * the IMPORTANT_PART is that PRINT children process INFO
*/

const fork = require('child_process').fork;
var getInfo = require('./getInfo');

// life time of child in seconds only for test
var timeOfLife = 60;

// create child that does nothing
var child = fork(__dirname + '/child.js' , [timeOfLife]);


console.log('wating a second for child creation.');
console.log('Parent PID:        ', process.pid);
console.log('Child PID:         ', child.pid);
console.log('life time of child:', timeOfLife, 's');

// init function for get JSON with info every 2 seconds
getInfo.init(2000,child.pid);

getInfo.event.on('data', (data) => {
  console.log('Child process data:');
  console.log(data);
});

getInfo.event.on('Error', (msg) => {
  console.log('Upss something strange happened:');
  console.log(msg);
});
