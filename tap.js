var test = require('tape'),
  path = require('path')

/*test.createStream().pipe(process.stdout);

process.argv.slice(2).forEach(function(file) {
  require(path.resolve(file));
})*/

test.createStream({
  objectMode: true
}).on('data', function(row) {
  console.log(JSON.stringify(row))
});

process.argv.slice(2).forEach(function(file) {
  require(path.resolve(file));
});