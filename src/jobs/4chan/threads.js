'use strict';

const fetch = require('node-fetch');
const boards = ["b", "pol", "r9k"];

function getThreads() {
  let promises = [];
  for (let board of boards) {
    promises.push(fetch("http://a.4cdn.org/"+board+"/threads.json").then(function(res) {
      return res.json();
    }).then(function(json){
      let threads = []
      for (let page of json) {
        for (let thread of page.threads) {
          thread.board = board;
          threads.push(thread)
        }
      }
      return threads;
    }))
  }
  return Promise.all(promises).then(function(values) {
    let results = [];
    for (let slice of values) {
      results = results.concat(slice)
    }
    return results;
  })
}

var lastRefreshThreads = [];

function existAndUptoDate(checkThread) {
  for (let thread of lastRefreshThreads) {
    if (thread.no === checkThread.no) {
      if (thread["last_modified"] === checkThread["last_modified"]) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}

function getNewThreads(){
  return getThreads().then(function(threads){
    let threadsToCheck = [];
    for (let thread of threads) {
      if (existAndUptoDate(thread)) {
        // skip
      } else {
        threadsToCheck.push(thread);
      }
    }
    lastRefreshThreads = threads;
    return threadsToCheck;
  });
}

module.exports = {
  getNewThreads: getNewThreads
}
