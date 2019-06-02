const request = require('request-promise');

/**
 * Sign-in to 4clubbers forum. 
 * Return cookies object, which is used to browse protected threads.
 * 
 * @param {string} username 
 * @param {string} md5password 
 */

const signIn = async (username = 'tunerocker', md5password = '6da23b7c1802436c9548df2ea07b42bd') => {
  const cookies = request.jar();
  
  await request.post({
    url: 'http://www.4clubbers.com.pl/login.php?do=login',
    jar: cookies,
    form: {
      vb_login_username: username,
      vb_login_password: '',
      s: '',
      securitytoken: 'guest',
      do: 'login',
      vb_login_md5password: md5password,
      vb_login_md5password_utf: md5password,
    }
  });

  return cookies;
};

module.exports = signIn;
