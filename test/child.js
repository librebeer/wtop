/*
 * This is a very stupid child that does nothing, just still alive for few
 * seconds while you  check with htop its PID
*/

var max = process.argv[2];
var n = 1;

var repeat = setInterval(() => {
  (n < max)? n++ : exit();
  //console.log('I want beer');
},1000);

var exit = function() {
  clearInterval(repeat);
};

process.on('message', function(msg){
    if(msg === 'get_mem_usage'){
        process.send({memUsage: process.memoryUsage()});
    }
});
