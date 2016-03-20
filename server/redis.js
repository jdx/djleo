'use strict';

let Redis = require('ioredis');
module.exports = new Redis(process.env.REDIS_URL);
