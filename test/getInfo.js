var events = require('events');
var spawn = require('child_process').spawn;
var eventEmitter = new events.EventEmitter();

var arr = ['-o','pid,tid,class,rtprio,ni,pri,psr,pcpu,pmem,stat,wchan:14,comm','-q'];
var PID;

//  create JSON object with data about process and send it trought event emitter
var createJson = function (data) {
  var info = data.toString('utf8').split('\n');
  if(info.length > 0){
    info.splice(-1,1);

    info[0] = info[0].replace(/\s+/g, ',').split(',');
    info[0].shift();

    info[1] = info[1].replace(/\s+/g, ',').split(',');
    info[1].shift();

    var obj = {};

    for(var i=0; i<info[0].length; ++i)
      obj[info[0][i]] = info[1][i];

    eventEmitter.emit('data',obj);
  }
  else {
    console.log(info);
    console.log('el proceso no existe');
    clearInterval(init);
    eventEmitter.emit('Error','no existe el proceso ',PID);
  }
};

// spawn ps command and send ouput to createJson function
var forever = function(pid){
  var ps = spawn('ps',arr);
  ps.stdout.on('data',createJson);
  ps.stderr.on('data',createJson);
};

// init process
var init = function(time,pid) {
  arr.push(pid);
  PID = pid;
  setInterval(forever,time,pid);
};


module.exports = {
  init: init,
  event:eventEmitter
};
