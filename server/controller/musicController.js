const fs = require('fs');
const Song = require('../model/SongModel');
const config = require('../config');
const parser = require('../lib/4c-parser');
const { download } = require('../lib/zs-dl');

let isParsing = false;

const parseForum = async (req, res) => {
  if (isParsing) return;
  let db = [];
  isParsing = true;

  const { socket } = res.locals;
  const genres = [
    'club-dance',
    'trance',
    'electro-electro-house',
    'big-room',
    'house'
  ];

  parser.event.on('parsing_start', payload => {
    // payload =  { genre }
    socket.emit('parsing_start', payload);
  });

  parser.event.on('parsing_threads_start', payload => {
    // payload =  { threads: threadurls.length }
    socket.emit('parsing_threads_start', payload);
  });

  parser.event.on('thread_parsed', payload => {
    //payload = {threadurl: threadLink}
    socket.emit('thread_parsed', payload);
  });

  for (genre of genres) {
    let values = await parseSubForum(genre);
    db = [...db, ...values];
  }

  console.log(`Parsing done, DB populated with ${db.length} new entries.`);
  socket.emit('parsing_end', { new: db.length });
  isParsing = false;
  res.json(db);

  async function parseSubForum(genre) {
    let db = [];

    let songs = await parser.quickParse(genre);
    socket.emit('parsing_zippyshare_start', { urls: await songs.length });

    for (song of songs) {
      if (await Song.findOne({ zslink: song.zslink })) {
        socket.emit('parsing_zippyshare', { url: song.zslink });
      } else {
        await socket.emit('parsing_zippyshare', { url: song.zslink });
        try {
          const file = await download(genre, song.zslink, `${config.output}`);
          if (file) {
            console.log(`Succesfully parsed ${song.zslink}`);
            Object.assign(song, file);
            const response = await new Song(song).save();
            db = [...db, response];
          }
        } catch (err) {
          console.log('Cant download:', err);
          return;
        }
      }
    }
    return db;
  }

  async function parseSubForumQuick(genre) {
    let songs = await parser.quickParse(genre);
    await socket.emit('parsing_zippyshare_start', { urls: await songs.length });

    for (song of songs) {
    }
    const promises = songs.map(song => async () => {
      if (await Song.findOne({ zslink: song.zslink })) {
        await socket.emit('parsing_zippyshare', { url: song.zslink });
        return {};
      } else {
        await socket.emit('parsing_zippyshare', { url: song.zslink });
        try {
          const file = await download(genre, song.zslink, `${config.output}`);
          if (!file) {
            return {};
          } else {
            console.log(`Succesfully parsed ${song.zslink}`);
            Object.assign(song, file);
            const response = await new Song(song).save();
            return response;
          }
        } catch (err) {
          console.log('Cant download:', err);
          return {};
        }
      }
    });

    let values = await Promise.all(promises.map(promise => promise()));
    values = values.filter(song => typeof song.genre !== 'undefined');
    return values;
  }
};

const getLobbySongs = async (req, res) => {
  const results = await Song.find({ in_lobby: true });
  for (let song of results) {
    song._doc.url = `http://${config.ip}/tunes/${song.fullpath}`;
  }
  res.json(results);
};

const getSongs = async (req, res) => {
  try {
    const results = await Song.aggregate([
      { $match: { is_active: true, in_lobby: false } },
      {
        $group: {
          _id: { genre: '$genre', year: { $year: '$date' } },
          songs: {
            $push: {
              genre: '$genre',
              author: '$author',
              title: '$title',
              url: { $concat: [`http://${config.ip}/tunes/`, '$fullpath'] }
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id.genre',
          songs: {
            $push: { year: '$_id.year', songs: '$songs' }
          }
        }
      }
    ]);

    res.json(results);
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

const updateSong = async (req, res) => {
  const id = req.params.id;
  const { author, title } = req.body;

  const songToUpdate = await Song.findById(id);

  await fs.rename(
    `${config.output}/${songToUpdate.fullpath}`,
    `${config.output}/${songToUpdate.path}/${author} - ${title}.mp3`,
    async err => {
      console.log(`${config.output}/${songToUpdate.fullpath}`);
      if (err) return res.json({ error: err });

      const updatedSong = await songToUpdate.updateOne({
        author,
        title,
        filename: `${author} - ${title}.mp3`,
        fullpath: songToUpdate.path + `/${author} - ${title}.mp3`,
        in_lobby: false
      });

      if (updatedSong.n > 0) return res.json({ success: 'success' });
      res.json({ error: 'Cant update song in database.' });
    }
  );
};

const removeSong = async (req, res) => {
  const id = req.params.id;
  const songToUpdate = await Song.findById(id);
  fs.unlink(`${config.output}/${songToUpdate.fullpath}`, async err => {
    if (err) return res.json({ error: err });
    const updatedSong = await songToUpdate.updateOne({
      is_active: false,
      in_lobby: false
    });

    if (updatedSong.n > 0) return res.json({ success: 'success' });
    res.json({ error: 'Cant delete song in database.' });
  });
};

module.exports = {
  getSongs,
  parseForum,
  updateSong,
  removeSong,
  getLobbySongs
};
