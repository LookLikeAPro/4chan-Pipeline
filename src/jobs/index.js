'use strict';

const schedule = require('node-schedule');
const chan = require("./4chan");

module.exports = function() {
  const app = this;
  var j = schedule.scheduleJob('*/10 * * * * *', function(){
    chan.getNewPics().then(function(results){
      console.log(results);
    })
    // console.log('The answer to life, the universe, and everything!');
  });
};
