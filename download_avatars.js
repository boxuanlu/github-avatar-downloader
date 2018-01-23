var request = require('request');
var gettoken = require('./secrets');
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': gettoken.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    var newbody = JSON.parse(body);

    cb(err, newbody);
  });
}

function downloadImageByURL(url, filePath){
  request.get(url)
    .on('error', function(err) {
      if (err) {
        throw err;
      }
    })
    .on('response', function(response) {
      console.log('Response Status Code:', response.statusMessage)
      console.log(response.headers['content-type']);

    })
    .pipe(fs.createWriteStream('filePath'));

}


downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', './kvirani.jpg');




getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors:", err);


  result.forEach(function(element) {
    console.log(element.avatar_url);


  });

});
