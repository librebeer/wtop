/*
 * This is a very stupid child that does nothing, just still alive for few
 * seconds while you  check with htop its PID
*/

var max = process.argv[2];
var n = 1, m = 0;
var vec = [];

var repeat = setInterval(() => {
  (n < max)? n++ : exit();
  m = 0;
  for(var i = 0; i < n*n*n*n; i++)
    m += i;
  vec.push(m)
  //console.log('I want beer ' + m);
}, 500);

var exit = function() {
  clearInterval(repeat);
};
