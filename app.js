const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);
const mongoose = require('mongoose');
const serveIndex = require('serve-index');
const { musicController } = require('./server/controller');

function init() {
  mongoose.connect('mongodb://localhost:27017/scrapper', {
    useNewUrlParser: true
  });
  app.use(function (req, res, next) {
    const origin = req.headers.origin;
    origin &&  res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use(function (req, res, next) {
    res.locals.socket = socket;
    next();
  });
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/tunes', express.static('D:\\tunes\\'), serveIndex('D:\\tunes\\'));
}

init();

// routes
app.post('/api/music/parse', musicController.parseForum);
app.get('/api/music/songs', musicController.getSongs);
app.get('/api/music/lobby', musicController.getLobbySongs);
app.patch('/api/music/songs/:id', musicController.updateSong);
app.delete('/api/music/songs/:id', musicController.removeSong);

app.use(
  '/',
  express.static('C:\\WebDev\\Scrapper\\client\\build'),
  serveIndex('C:\\WebDev\\Scrapper\\client\\build')
);

server.listen(80, () => {
  console.log('Web Server started.');
});





