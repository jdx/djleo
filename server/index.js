'use strict';

let app         = require('koa')();
let serve       = require('koa-static');
let send        = require('koa-send');
let etag        = require('koa-etag');
let conditional = require('koa-conditional-get');
let morgan      = require('koa-morgan');
let router      = require('koa-router')();
let session     = require('koa-generic-session');
let redis       = require('koa-redis');

let production  = process.env.NODE_ENV === 'production';

app.keys = [process.env.SECRET];

app.use(morgan.middleware(production ? 'combined' : 'dev'));
app.use(conditional());
app.use(etag());
app.use(serve('public'));

app.use(session({
  store: redis(process.env.REDIS_URL)
}));

require('./facebook')(router);

app.use(router.routes());
app.use(router.allowedMethods());

// catch-all
app.use(function* (next) {
  if (this.method !== 'HEAD' && this.method !== 'GET') return yield next;
  if (!this.session.facebook_token) return this.redirect('/auth/facebook');
  yield send(this, 'index.html');
});

app.listen(process.env.PORT || 3000);
