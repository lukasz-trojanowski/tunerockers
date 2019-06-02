const zsExtract = require('zs-extract');
const request = require('request-promise');
const fs = require('fs');

const event = require('./events');
const config = require('./config');
const currentDate = require('./utils/currentDate');

/**
 * Download mp3 from zippyshare. Given path string must end with /. If omitted will use D:\tunes
 * Returns object with file metadata
 * If not found return null
 * @param {string} url 
 * @param {string} path 
 */

const download = async (genre, url, path = config.output) => {
  let parsedInfo = await parseZS(url);
  if (!parsedInfo) return null;

  const parsedYear = parsedInfo.date.getFullYear();
  const parsedMonth = parsedInfo.date.getMonth() + 1;

  parsedInfo.path = `${genre}/${parsedYear}/${parsedMonth}`;
  parsedInfo.fullpath = `${parsedInfo.path}/${parsedInfo.filename}`;

  const localpath = `${path}/${parsedInfo.path}`;

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath, {recursive: true} );
  }
  
  await request
    .get(parsedInfo.zsdownloadlink)
    .pipe(fs.createWriteStream(`${localpath}/${parsedInfo.filename}`));

  return parsedInfo;
};

const parseZS = async url => {
  try {
    const info = await zsExtract.extract(url);
    const {filename, author, title } = getMeta(info.filename);
    event.emit('zs_parsed');
    return {
      date: new Date(Date.now()),
      filename: filename,
      author: author,
      title: title,
      zsfilename: info.filename,
      zsdownloadlink: info.download
    };
  }

  catch(err) {
    event.emit('zs_parsed');
    // console.log(`Cant parse ${url}: `, err.message);
    return null;
  }
};

/**
 * Tries to extract author, title and beautify filename
 * @param {string} zsfilename 
 */

const getMeta = (zsfilename) => {
  // beautify filename
  zsfilename = zsfilename.replace(/%26/g, '&');
  zsfilename = zsfilename.replace(/%2b/g, '&');
  zsfilename = zsfilename.replace(/%2c/g, '&');
  zsfilename = zsfilename.replace(/%../g, '&');
  zsfilename = zsfilename.replace(/_/g, ' ');
  zsfilename = zsfilename.replace(/ ?([\]\[\(w\.]+)?4club?bers.+\.mp3/i, '');
  let filename = zsfilename.split('-');
  // try to extract author and title
  const author = filename[0] ? filename[0].trim() : zsfilename.replace(/%../g, '&');
  const title = filename[1] ? filename[1].trim() : zsfilename.replace(/%../g, '&');
  
  return {
    filename: zsfilename + '.mp3',
    author: author,
    title: title
  };
};

module.exports = download;