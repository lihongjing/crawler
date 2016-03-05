var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var path = require('path')
var bodyParser = require('body-parser')
var crawler = require('./cheerio')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true'}))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  socket.on('start', function(entry){
    crawler(entry, function(url){
      console.log(url)
      socket.emit('add', url)
    })
  })
})

server.listen(3000, function () {
  console.log('App is listening on port 3000!')
})
