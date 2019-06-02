const request = require('request-promise');

const event = require('./events');
const signIn = require('./auth');
const config = require('./config');


/**
 * Parse genre subforum for thread url's.
 * Valid parameters: 'trance', 'house', 'big-room', 'club-dance' etc...
 * 
 * @param {string} genre 
 */

const parseSubForum = async genre => {
  console.log(`Received request for: ${genre.toUpperCase()}`);

  // Sign-in
  const cookies = await signIn();

  // Regex for finding URL's to threads
  const regex = new RegExp(`http:\/\/www\.4clubbers\.com\.pl\/${genre}\/\[0-9]+[a-zA-Z0-9_-]+\[^-0-9].html`, 'g');
    
  let promises = [];
    
  for (let i = 1; i <= config.numofpages; i++) {

    let threadLinks = [];
    let pageNumber = i === 1 ? '' : i;

    const url = `http://www.4clubbers.com.pl/${genre}/${pageNumber}?sort=views&order=desc&daysprune=${config.numofdays}`;

    promises.push(
      () => (
        new Promise(async resolve => {
          const response = await request.get({ url: url, jar: cookies, timeout: config.timeout });
          threadLinks = [...threadLinks, ...new Set(response.match(regex))];
          threadLinks = await filterThreads(threadLinks);
          event.emit('genre_parsed', { max: config.numofdays });
          resolve(threadLinks);
        })
      )
    );

  } // for loop

  let values = await Promise.all(promises.map(promise => promise()));
  return values.flat();
};


/**
 * Filter found threads
 * 
 * @param {array} threadLinks 
 */

const filterThreads = async threadLinks => {
  // remove user specified thread's
  await config.ignoredthreads.forEach(thread => {
    const index = threadLinks.findIndex(el => el == thread);
    if (index > -1) {
      threadLinks.splice(index, 1);
    }
  });

  // remove thread's that are leading to album's and tutorial's
  threadLinks = await threadLinks.filter((threadLink) => {
    if (config.ignorealbums == true) {
      return (!/album/gim.test(threadLink)) && (!/tutorial/gim.test(threadLink));
    } 
    return (!/tutorial/gim.test(threadLink));
  });

  return threadLinks;
};

module.exports = parseSubForum;
