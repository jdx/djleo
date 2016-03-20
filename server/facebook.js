'use strict';

let qs    = require('querystring');
let uuid  = require('node-uuid');
let got   = require('got');
let redis = require('./redis');
let co    = require('co');

let redirectURI = process.env.BASE_URL + '/auth/facebook/callback';

const jeff = '10100523634220041';
//const leo  = '?';

function facebookAPI(token) {
  return function (path) {
    let url = `https://graph.facebook.com/v2.5${path}`;
    if (path.indexOf('?') === -1) url = url + '?' + qs.stringify({access_token: token});
    else                          url = url + '&' + qs.stringify({access_token: token});

    return got(url, {json: true})
    .then(rsp => rsp.body);
  };
}

function appToken () {
  return got('https://graph.facebook.com/oauth/access_token?'+qs.stringify({
    client_id:      process.env.FACEBOOK_APP_ID,
    client_secret:  process.env.FACEBOOK_APP_SECRET,
    grant_type:     'client_credentials',
  }))
  .then(rsp => rsp.body.split('=')[1]);
}


module.exports = function (router) {

  router.get('/auth/facebook', function* () {
    let scope = this.query.scope ? this.query.scope.split(',') : [];
    scope.push('user_friends');
    this.redirect('https://www.facebook.com/dialog/oauth?' + qs.stringify({
      client_id:    process.env.FACEBOOK_APP_ID,
      redirect_uri: redirectURI,
      state:        uuid.v4(),
      scope:        scope.join(','),
    }));
  });

  router.get('/auth/facebook/callback', function* () {
    if (this.query.error) {
      this.status = 400;
      this.body = `error! ${this.query.error_description}`;
      return;
    }
    let rsp = yield got('https://graph.facebook.com/v2.5/oauth/access_token?'+qs.stringify({
      client_id:      process.env.FACEBOOK_APP_ID,
      client_secret:  process.env.FACEBOOK_APP_SECRET,
      redirect_uri:   redirectURI,
      code:           this.query.code,
    }), {json: true});
    let token = rsp.body.access_token;

    let tokenInfo = yield got('https://graph.facebook.com/debug_token?'+qs.stringify({
      input_token:  token,
      access_token: yield appToken(),
    }), {json: true});
    tokenInfo = tokenInfo.body.data;
    if (tokenInfo.user_id === jeff) {
      yield redis.set(`fb:${tokenInfo.user_id}`, token);
    }

    this.session.facebook_token = token;
    this.redirect('/');
  });
};

function* refreshFeed () {
  try {
    console.error('refreshing...');
    let token = yield redis.get(`fb:${jeff}`);
    let fb = facebookAPI(token);
    let posts = yield fb('/me/feed?filter=app_2309869772');

    console.dir(posts.data[2]);
    let link = yield fb(`/${posts.data[2].id}`);
    console.dir(link);
  } catch (err) {
    console.error(err.stack);
  }
}

setInterval(co.wrap(refreshFeed), 60000);
co(refreshFeed());
