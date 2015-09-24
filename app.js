'use strict';

let serve = require('koa-static');

let koa = require('koa');
let app = koa();

app.use(serve('./static'));

app.listen(process.env.PORT || 3000);
