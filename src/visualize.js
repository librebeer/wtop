var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen()
, bar = contrib.bar(
      { label: 'Server Utilization (%)'
        , barWidth: 4
          , barSpacing: 6
          , xOffset: 0
          , maxHeight: 9
          , height: "40%"});
screen.append(bar);
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var visualizer = function(info) {
  
  bar.setData(
             { titles: ['%CPU', '%MEM']
               , data: [info['%CPU'], info['%MEM']]});

  screen.render()
}

visualizer.prototype.update = function(info) {
  if(info != null) {
  bar.setData(
             { titles: ['%CPU', '%MEM']
             , data: [info['%CPU'], info['%MEM']]});
  //console.log(info['%CPU']);
  screen.render();
  }
}

module.exports = visualizer;
