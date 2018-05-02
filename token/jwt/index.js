const
  jwt = require('jsonwebtoken'),

  TOKEN_VERIFIED = 'TOKEN_VERIFIED',
  TOKEN_UNDEFINED = 'TOKEN_UNDEFINED',
  TOKEN_VERIFICATION_FAIL = 'TOKEN_VERIFICATION_FAIL',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED'


/**
 * The jwt middleware to validate the token
 * @param  {Object}   req  The http request object, should comply to Node express request objects
 * @param  {Object}   res  The http response object, should comply to Node express response objects
 * @param  {Function} next The next method to call the next item in middleware chain
 * @return Null
 */
function MiddlewareFactory(secret) {

  /**
   * Middleware constructor
   * This is passed to each controller (Route) as to allow it to be applied
   * with options onto that route or be passed down again for each route to specify its own options.
   * This is scoped in the MIddleware factory so that the middleware is compinat to original configuration
   * of secrets and token type.
   * @param {[Object]} options The options for the middlewware instance
   * @example
   * {
   *   passThrough: Boolean false by default, Allow next to be called even if token is not valid or can not be verified
   * }
   * @return {Function} the token middleware with options applied
   */
  function Middleware(options) {

    const passThough = (options && options.passThrough) || false

    /**
     * The token middleware
     * @param  {Request}   req  The HTTP request, must comply to Express like request object API
     * @param  {Response}   res  The HTTP response, must comply to Express like response object API
     * @param  {Function} next The function to call the next funtion in middleware chain
     * @return undefined
     */
    function middleware(req, res, next) {

      //Decide on best header strategy or do we allow both?
      const token = req.headers['x-access-token'] || req.headers['bearer']

      let authStatus = {}

      if (!token) {

        authStatus = {
          authenticated: false,
          authStatus: TOKEN_UNDEFINED,
          authMessage: "A authentication token was not found"
        }

        //If the middleware options.passThrough is truthy
        //then call next and let the next in the chain decide how to handle.
        //If the passThrough is undefined then presume false
        if (passThough) {
          req.auth = authStatus
          return next()
        }
        else {
          return res.status(401).send(authStatus)
        }

      }
      else {

        jwt.verify(token, secret, function(err, decoded) {

          if (err) {

            authStatus = {
              authenticated: false,
              authStatus: TOKEN_VERIFICATION_FAIL,
              authMessage: "Verifications of the token failed"
            }

            if (passThough) {
              req.auth = authStatus
              return next()
            }
            else {
              return res.status(500).send(authStatus)
            }

          }

          //If the token has an expiry check it against Date.now()

          if (decoded.exp !== void 0 || decoded.exp <= Date.now()) {


            authStatus = {
              authenticated: false,
              authStatus: TOKEN_EXPIRED,
              authMessage: "The token has expired."
            }

            if (passThough) {
              req.auth = authStatus
              return next()
            }
            else {
              return res.status(400).send(authStatus)
            }

            res.status(400);
            res.json(authStatus);
            return;
          }

          else {

            authStatus = {
              authenticated: true,
              authStatus: TOKEN_VERIFIED,
              authMessage: "The token was verified.",
              token: decoded
            }

            req.auth = authStatus

            return next()

          }

        })
      }
    }

    return middleware
  }

  Middleware.TOKEN_VERIFIED = TOKEN_VERIFIED
  Middleware.TOKEN_UNDEFINED = TOKEN_UNDEFINED
  Middleware.TOKEN_VERIFICATION_FAIL = TOKEN_VERIFICATION_FAIL
  Middleware.TOKEN_EXPIRED = TOKEN_EXPIRED

  return Middleware
}


/**
 * creates a facttpory function for JWT tokens
 * @param  {String} type    The token factpry type, 'HS256' | 'RS256'
 * @param  {String} secret  The token secret
 * @return {Function}       The token factory
 */
function TokenFactory(options) {

  const
    type = (options && options.type) || "HS256",
    secret = options && options.secret

  if (!secret) {
    throw new Error("TokenFactory : You must provide a secret.")
  }

  if (type === "HS256") {

    //Return the funtion that will create dthe signed jws token
    //to be given to the client.
    //The claims object paramater should have at least one property
    //userId
    //The headers parameter can 
    return function(claims, headers) {
      //Here we add the standard exp to the header
      //as the expiresIn option dicumented by jsonwebtoken
      //seemed to give a wrong date. To be investigated.
      return jwt.sign(claims, secret, {
        header: {
          //The expiry if exists in headers or default of 1 day
          exp: (headers && headers.exp) || Date.now() + 8640000
        }
      })
    }
  }

  //To be completed
  //The will be to provide a RSA token.
  //To be investigated on implementation
  if (type === "RS256") {
    //Allow for RSA token
    return undefined
  }
  return undefined
}

module.exports = {
  MiddlewareFactory,
  TokenFactory
}