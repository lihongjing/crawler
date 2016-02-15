var $ = require('cheerio')
var request = require('request')

var visitedUrls = [], toBeVisitedUrls = [], entry

var regex = /^\/(.)+/g

function run(url, cb) {
  visitedUrls.push(url)
  request(url, function(err, resp, html) {
      cb(visitedUrls.slice(visitedUrls.length - 1).join(''))
      if (!err && resp.statusCode === 200) {
        var parsedHTML = $.load(html)
        parsedHTML('a').map(function(i, link) {
          var href = $(link).attr('href')
          if(regex.test(href)) {
            if(Array.prototype.indexOf.call(visitedUrls, entry + href) === -1 && Array.prototype.indexOf.call(toBeVisitedUrls, entry + href) === -1) {
              toBeVisitedUrls.push(entry + href)
            }
          }
        })
      }
      if(toBeVisitedUrls.length) {
        run(toBeVisitedUrls.shift(), cb)
      }
      else {
        cb('done')
      }
  })
}

module.exports = function(entryUrl, cb) {
  entry = entryUrl
  run(entry, cb)
}
