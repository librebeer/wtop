var blessed = require('blessed')
,contrib = require('blessed-contrib')
, screen = blessed.screen();

var visualizer = function(info) {
  this.bar = contrib.bar(
      { label: 'Server Utilization (%)'
        , barWidth: 4
          , barSpacing: 6
          , xOffset: 0
          , maxHeight: 9
          , height: "40%"});
  console.log("Hi");
  this.screen = screen;

  this.screen.append(this.bar);
  
  this.update(info);

  this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  console.log("Hi i'm going to render");
  this.screen.render()
}

visualizer.prototype.update = function(info) {
  this.bar.setData(
             { titles: ['%CPU', '%MEM']
               , data: [info['%CPU'], info['%MEM']]})
  
}

module.exports = visualizer;
