'use strict'

const
  bodyParser = require('body-parser'),
  express = require('express'),
  //expressHandlebars = require('express-handlebars'),
  //logger https://github.com/expressjs/morgan
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  //var debug = require('debug')('app:' + process.pid)
  mongoosastic = require('mongoosastic')

module.exports = function() {

  const
    server = express(),
    serverWrapper = {
      server: server
    }

  mongoose.Promise = global.Promise

  serverWrapper.create = function(config) {
    let routes = require('./routes')

    // Server settings
    server.set('env', config.env)
    server.set('port', config.port)
    server.set('hostname', config.hostname)
    server.set('viewDir', config.viewDir)

    // Returns middleware that parses json
    server.use(bodyParser.urlencoded({
      extended: true
    }))
    server.use(bodyParser.json())

    // CORS
    server.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    //Disble etag, disbale caching by browsers
    server.disable('etag')

    server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

    /*mongoose.connect(config.database)
    var db = mongoose.connection

    /*db.on('error', console.error.bind(console, 'connection error:'))
    db.once('openUri', function() {
      console.log('connection')
    })*/

    /*app.use(session({
      secret: 'foo',
      store: new MongoStore({mongooseConnection: mongoose.connection}),
      resave: false,
      saveUninitialized: true
    }))*/

    //app.use(passport.initialize());

    // Setup view engine
    /*server.engine('.hbs', expressHandlebars({
        defaultLayout: 'default',
        layoutsDir: config.viewDir + '/layouts',
        extname: '.hbs'
    }))

    server.set('views', server.get('viewDir'))
    server.set('view engine', '.hbs')*/

    // Set up routes
    // Pass in teh server instance and the Router constructor
    // This allows swapout of express if need be.
    routes.init(server, express.Router)

    return serverWrapper
  }

  serverWrapper.start = function() {
    let hostname = server.get('hostname'),
      port = server.get('port')

    server.listen(port, function() {
      console.log('Express server listening on - http://' + hostname + ':' + port)
    })

    return serverWrapper
  }

  return serverWrapper
}