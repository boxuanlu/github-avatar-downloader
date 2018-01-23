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

    if (res.statusCode === 200) {
      cb(err, newbody);

    } else {
      console.log("error input");
    }


  });
}

function downloadImageByURL(url, filePath) {
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
    .pipe(fs.createWriteStream(filePath));

}


var string = process.argv[2];
var string2 = process.argv[3];
if (process.argv.length !== 4) {
  console.log("error");

} else {

  getRepoContributors(string, string2, function(err, result) {


    result.forEach(function(element) {
      console.log(element.avatar_url);
      console.log('.avatar/' + element.login + '.jpg');
      downloadImageByURL(element.avatar_url, 'avatar/' + element.login + '.jpg');


    })


  });
};
