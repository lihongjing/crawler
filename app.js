var express = require('express')
var bodyParser = require('body-parser')
var crawler = require('./cheerio')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true'}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res, next) {
  crawler('http://www.apia.com.au', function(url) {
    if(url !== 'done') {
      res.write(url + '\n')
    }
    else {
      next()
    }
  })
}, function(req, res) {
  res.end()
})

app.listen(3000, function () {
  console.log('App is listening on port 3000!')
})
