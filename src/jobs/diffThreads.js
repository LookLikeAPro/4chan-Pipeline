'use strict';

const fetch = require('node-fetch');
const boards = ["b", "pol", "r9k"];

function getThreads() {
  let promises = [];
  for (let board of boards) {
    promises.push(fetch("http://a.4cdn.org/"+board+"/threads.json").then(function(res) {
      return res.json();
    }))
  }
  return Promise.all(promises).then(function(values) {
    let pages = [];
    for (let json of values) {
      pages = pages.concat(json)
    }
    let threads = []
    for (let page of pages) {
      for (let thread of page.threads) {
        threads.push(thread);
      }
    }
    return threads;
  })
}

var lastRefresh = [];

getThreads().then(function(threads){
  console.log(threads);
  
});
