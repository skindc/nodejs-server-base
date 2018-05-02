const
  server = require('./server')(),
  config = require('./config')

server
  .create(config)
  .start()
