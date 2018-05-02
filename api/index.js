const
  APIV1Delegate = require('./v1')

/**
 * A constructor function for the API
 * @param  {Router} Router An express like Router constructor
 * @return {Router}        The router that was passed as the parameter
 */

function APIController(Router, AuthMiddleware) {

  const
    router = Router()

  router.get('/', function(req, res) {
    res.status(200).send('Hello, welcome to the Diddit API')
  });

  router.use('/v1', APIV1Delegate(Router, AuthMiddleware))

  return router

}

module.exports = APIController