'use strict';

const
  config = require('../../config'),
  Token = require('../../token'),
  AuthController = require('../../auth'),
  ApiController = require('../../api')

/**
 * Initiate the routes for the express application
 * @param  {Server} server The server instance
 * @param  {Router} Router The roputer constructor to be used for new Route objects
 * @return {Server}        The server that was the server parameter
 *
 * The server param here is a server instance by the likes of express.
 * If the server is not an express server the server itself of a wrapper of that instance
 * must provide accessible methods 'get' and 'use' that implement the equivelent of the same methods
 * on an express instance.
 *
 * The Router parameter must be a function that is a constructor for a new Router taht is compatible
 * with the server that was provided as the first parameter. Again this Router constructor must construct
 * a Router that provides the same methods as the Express.Router and it must operate with the server.
 * 
 */
function init(server, Router) {

  const token = Token({
    secret: config.secret,
    type: Token.TOKEN_TYPE_HS256
  })

  server.get('*', function(req, res, next) {
    console.log('Request was made to: ' + req.originalUrl)
    return next()
  });

  server.get('/', function(req, res) {
    //return docs page instead of this message
    res.status(200).send('Hello, welcome to the API')
  });

  //Change this to /rest
  server.use('/account', AuthController(Router, token.tokenFactory))

  //Move versions of api to rest module
  server.use('/rest', ApiController(Router, token.Middleware))

  //The add /graphQL
  //server.use('/gql', apiRoute(Router));

  //server.use('/home', homeRoute);
  //server.use('/error', errorRoute);*/

  //Return the server instance for chaining
  return server
}

module.exports = {
  init: init
};