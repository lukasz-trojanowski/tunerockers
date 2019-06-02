/**
 * Parse 4clubbers subforum, returning array of found matches.
 * 
 * @param {string} threadLink 
 * Accepted values: 'trance', 'house', 'big-room', 'club-dance', 'electro-electro-house' etc..
 */

export declare function parse(genre: string): Promise<[{
  genre: string;
  threadlink: string;
  zshash: string;
  zsserver: string;
  zslink: string;
  downloads: number;
}]>;

/**
 * Quick parse 4clubbers subforum, returning array of found matches.
 * 
 * @param {string} threadLink 
 * Accepted values: 'trance', 'house', 'big-room', 'club-dance', 'electro-electro-house' etc..
 */

export declare function quickParse(genre: string): Promise<[{
  genre: string;
  threadlink: string;
  zshash: string;
  zsserver: string;
  zslink: string;
  downloads: number;
}]>;