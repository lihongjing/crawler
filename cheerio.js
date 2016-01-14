var $ = require('cheerio')
var request = require('request')
var gutil = require('gulp-util')

var vistedUrls = [], toBeVisitedUrls = []

var regex = /^\/(.)+/g

function crawlHTML(err, resp, html) {
  if(resp.statusCode === 200) {
    gutil.log(gutil.colors.green(resp.statusCode), ' ', vistedUrls.slice(vistedUrls.length - 1))
  }
  else {
    gutil.log(gutil.colors.red(resp.statusCode), ' ', vistedUrls.slice(vistedUrls.length - 1))
  }

  if (!err && resp.statusCode === 200) {
    var parsedHTML = $.load(html)
    parsedHTML('a').map(function(i, link) {
      var href = $(link).attr('href')
      if(regex.test(href)) {
        if(Array.prototype.indexOf.call(toBeVisitedUrls, entry + href) === -1) {
          toBeVisitedUrls.push(entry + href)
        }
      }
    })

    if(toBeVisitedUrls.length) {
      run(toBeVisitedUrls.shift())
    }
  }
}

var entry = process.argv[2]

function run(url) {
  vistedUrls.push(url)
  request(url, crawlHTML)
}

run(entry)
