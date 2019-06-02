/**
 * Configuration file
 */

const config = {
  // Describes number of days to parse
  numofdays: 60,

  // Describes number of genre pages to parse.
  // All genres have 30 threads per page
  // Genres have about 5-15 pages of results from last 60 days
  // If numofpages is higher than number of found pages, 
  // then pages with newest threads will also be parsed 
  numofpages: 5,

  // Limit number of found threads to parse, 
  // if null all found threads will be parsed
  // Threads with lowest popularity will be removed from parsing.
  limitthreads: null,

  // Try to ignore threads with albums
  ignorealbums: true,

  // Array of strings. URL's to threads that you want to ignore
  ignoredthreads: [],

  // timeout for requests
  timeout: 0,

  // directory to save downloaded mp3
  output: 'D:/tunes'
};

module.exports = config;