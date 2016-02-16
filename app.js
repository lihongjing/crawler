var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var crawler = require('./cheerio')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true'}))
app.use(express.static(path.join(__dirname, './public')))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res, next) {
  console.log('server')
  res.setHeader('Connection', 'Transfer-Encoding')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Transfer-Encoding', 'chunked')
  crawler('http://www.apia.com.au', function(url) {
    if(url !== 'done') {
      console.log(url)
      res.write(url + '\n')
      res.flush()
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
