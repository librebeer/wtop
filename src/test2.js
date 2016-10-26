var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen();
var bar = contrib.bar(
    { label: 'Server Utilization (%)'
      , barWidth: 4
        , barSpacing: 6
        , xOffset: 0
        , maxHeight: 9})
screen.append(bar) //must append before setting data
  bar.setData(
      { titles: ['bar1', 'bar2']
        , data: [5, 10]}  )
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

screen.render()
