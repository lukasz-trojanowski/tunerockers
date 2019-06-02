const config = require('./config');
const parseSubForum = require('./parseSubForum');
const parseThread = require('./parseThread');
const event = require('./events');

/**
 * Parse 4clubbers subforum.
 *
 * @param {string} threadLink
 */

const parse = async (genre = 'trance') => {
  event.emit('parsing_start', { genre });
  console.log('4c-parser started.');

  const threadurls = await parseSubForum(genre);
  threadurls.length = config.limitthreads || threadurls.length;

  console.log(`Got ${threadurls.length} thread(s). Parsing...`);
  event.emit('parsing_threads_start', { threads: threadurls.length });

  let songsDB = [];

  for (const url of threadurls) {
    const songs = await parseThread(url);
    songsDB = [...songsDB, ...songs];
  }

  console.log(`Found ${songsDB.length} zippyshare link(s).`);
  return songsDB;
};

/**
 * Quick parse 4clubbers subforum.
 *
 * @param {string} threadLink
 */

const quickParse = async (genre = 'trance') => {
  event.emit('parsing_start', { genre });
  console.log('4c-parser started (quick).');

  // get URL's to threads
  const threadurls = await parseSubForum(genre);
  threadurls.length = config.limitthreads || threadurls.length;

  console.log(`Got ${threadurls.length} thread(s). Parsing...`);
  event.emit('parsing_threads_start', { threads: threadurls.length });

  const promises = threadurls.map(threadurl => parseThread(threadurl));
  const values = await Promise.all(promises);

  console.log(`Found ${values.flat().length} zippyshare link(s).`);
  return values.flat();
};

module.exports = { parse, quickParse };
