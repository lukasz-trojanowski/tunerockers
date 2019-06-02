const request = require('request-promise');
const cheerio = require('cheerio');
const event = require('./events');
const signIn = require('./auth');

/**
 * Parse thread URL, returning array of object literals:
 * {
 *  genre: genre of parsed thread (eg. trance);
 *  threadlink: parsed thread URL;
 *  zshash: zippyshare file hash;
 *  zsserver: zippyshare server;
 *  zslink: generated link to zippyshare;
 * }
 * 
 * @param {string} threadLink 
 */

const parseThread = async threadLink => {
  // Get genre
  const genre = /http:\/\/www.4clubbers.com.pl\/([\w-]+)\//.exec(threadLink)[1];

  // Sign-in
  const cookies = await signIn();
  console.log(threadLink);

  const response = await request.get({ url: threadLink, jar: cookies });

  const $ = cheerio.load(response);
    
  // all info we are looking for
  // is stored in <script> block which have 
  // 'cached posts' string at the beginning

  let html = $('script').filter((i, el) => {
    return /cached posts/g.test($(el).html());
  });
  html = $(html).first().html();

  // regex for text block with zippyshare data to extract
  const regexZS = /file=(\w+)&amp;server=(\d+)/gim;
  // regex for text block with number of downlaods
  const regexDownloads = /Liczba pobra.: <b>([0-9]+)<\/b>/gim;

  let songsInfo = [];
  // create array without duplicates
  const zsdata = [...new Set(html.match(regexZS))];
  // const downloads = [...new Set(html.match(regexDownloads))];
  const downloads = [...html.match(regexDownloads)];

  zsdata.forEach((zsLink, index) => {
    // 2nd regex (same value) for extracting specified zs data 
    const regexZS = /file=(\w+)&amp;server=(\d+)/gim;
    const [input, zshash, zsserver] = regexZS.exec(zsLink);
      
    // 2nd regex (same value) for number of downlaods 
    const regexDownloads = /Liczba pobra.: <b>([0-9]+)<\/b>/gim;

    const song = {
      genre: genre,
      threadlink: threadLink.trim(),
      zshash: zshash,
      zsserver: zsserver,
      zslink: `https://www${zsserver}.zippyshare.com/v/${zshash}/file.html`,
    };

    try {
      song.downloads = regexDownloads.exec(downloads[index])[1];
    } catch (error) {
      song.downloads = 0;
    }
    // add extracted info to array
    songsInfo.push(song);
  });
  event.emit('thread_parsed', {threadurl: threadLink});
  return songsInfo;
};

module.exports = parseThread;