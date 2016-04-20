'use strict';

const fetch = require('node-fetch');
const threads = require("./threads");

function getNewPics() {
  return threads.getNewThreads().then(function(threads){
    let promises = [];
    let fuckscount = 0;
    for (let thread of threads) {
      if (fuckscount > 4) {
        break;
      }
      fuckscount++;
      promises.push(fetch("http://a.4cdn.org/"+thread.board+"/thread/"+thread.no+".json").then(function(res) {
        return res.json();
      }).then(function(json){
        let images = []
        for (let post of json.posts) {
          if (post["tim"]) {
            images.push("http://i.4cdn.org/"+thread.board+"/"+post["tim"]+post["ext"])
          }
        }
        return images;
      }))
    }
    return promises;
  }).then(function(promises){
    return Promise.all(promises).then(function(values) {
      let results = [];
      for (let slice of values) {
        results = results.concat(slice)
      }
      return results;
    })
  });
}

// getNewPics().then(function(results){
//   console.log(results);
// })

module.exports = {
  getNewThreads: threads.getNewThreads,
  getNewPics: getNewPics
}
