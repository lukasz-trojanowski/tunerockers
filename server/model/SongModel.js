const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  author: {type: String, required: true},
  title: {type: String, required: true},
  genre: {type: String, required: true},
  threadlink: {type: String, required: true},
  zslink: {type: String, required: true},
  zsdownloadlink: {type: String, required: true},
  zsserver: {type: String, required: true},
  zshash: {type: String, required: true},
  zsfilename: {type: String, required: true},
  filename: {type: String, required: true},
  path: {type: String, required: true},
  fullpath: {type: String, required: true},
  date: {type: Date, required: true},
  downloads: {type: Number, required: false},
  in_lobby: {type: Boolean, default: true, required: true},
  is_active: {type: Boolean, default: true, required: true},
});

module.exports = mongoose.model('Songs', SongSchema);