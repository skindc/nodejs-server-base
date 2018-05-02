module.exports = {
  hostname: 'localhost',
  port: 8383,
  viewDir: './app/views',
  secret: '139205e3d75938a44b1eabea7c47c6af3422e4d6',
   //database: 'mongodb://127.0.0.1:27017/diddit'
  database: 'mongodb://database:27017/diddit?writeRetry=true'
}