'use strict';

const schedule = require('node-schedule');

module.exports = function() {
  const app = this;
  var j = schedule.scheduleJob('* * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
  });
};
