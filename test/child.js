/*
 * This is a very stupid child that does nothing, just still alive for few
 * seconds while you  check with htop its PID
*/

var max = process.argv[2];
var n = 1;

var repeat = setInterval(() => {
  (n < max)? n++ : exit();ls
  //console.log('I want beer');
},1000);

var exit = function() {
  clearInterval(repeat);
};
