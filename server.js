'use strict';

let app         = require('koa')();
let serve       = require('koa-static');
let send        = require('koa-send');
let etag        = require('koa-etag');
let conditional = require('koa-conditional-get');
let morgan      = require('koa-morgan');
let production  = process.env.NODE_ENV === 'production';

app.use(morgan.middleware(production ? 'combined' : 'dev'));
app.use(conditional());
app.use(etag());
app.use(serve('public'));

// catch-all
app.use(function* (next) {
  if (this.method !== 'HEAD' && this.method !== 'GET') return yield next;
  yield send(this, 'public/index.html');
});

app.listen(process.env.PORT || 3000);
