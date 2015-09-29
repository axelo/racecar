'use strict';
let fs = require('fs');
let stream = require('stream');
let CombinedStream = require('combined-stream2');
let sourcemap = require('source-map');
let Concat = require('concat-with-sourcemaps')
let route = require('koa-route');
let serve = require('koa-static');

let koa = require('koa');
let app = koa();

let sources = fs.readdirSync('./src')
  .filter((f) => f.endsWith('.js'))
  .map((f) => './src/' + f);

app.use(route.get('/js/racecar-bundle.js', getSources));
app.use(route.get('/js/racecar-bundle.js.map', getSourceMap));
app.use(serve('./static'));

app.listen(process.env.PORT || 3000);

function *getSources() {
  this.type = 'application/javascript';
  this.body = concatSources(false).content;
}

function *getSourceMap() {
  this.type = 'application/json';
  this.body = concatSources(true).sourceMap;
}

function concatSources(withSourcemap) {
  var concat = new Concat(withSourcemap, '/js/racecar-bundle.js', '\n');

  sources.forEach((file) => concatAdd(file, fs.readFileSync(file, 'utf8')));
  concatAdd('./src/main.js', 'Racecar();');
  concatAdd('./src/sourcemap.js', '//# sourceMappingURL=/js/racecar-bundle.js.map');

  function concatAdd(file, content) {
    concat.add(file, content, {
      sourcesContent: [content]
    });
  }

  return concat;
}


