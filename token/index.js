const

  TOKEN_TYPE_HS256 = 'HS256',
  TOKEN_TYPE_RS256 = 'RS256',

  jwtAuth = require('./jwt'),
  //The secret supplied as part of the options for the Auth constructor
  //but we supply a default fallback
  defaultSecret = '96f44e791eb1358827ef10761f1f1143a75ed3fb',
  defaultType = TOKEN_TYPE_HS256

/**
 * [Auth description]
 * @param {[type]} options [description]
 */
function Token(options) {

  const
    type = (options && options.type) || defaultType,
    secret = (options && options.secret) || defaultSecret

  if (secret === defaultSecret) {
    console.warn('The default secret for the JWT token is being used.')
  }

  return {

    Middleware: jwtAuth.MiddlewareFactory(secret),
    //Offer a TokenFactory constructor for varied use.
    //But use the secret passed to the construstot of Auth as default
    TokenFactory(options) {

      const
        type = (options && options.type) || defaultType,
        newSecret = (options && options.secret) || secret

      return jwtAuth.TokenFactory({
        type,
        secret: newSecret
      })
    },
    //The token factory instance constructed from options
    tokenFactory: jwtAuth.TokenFactory({
      type,
      secret
    })
  }
}

Token.TOKEN_TYPE_HS256 = TOKEN_TYPE_HS256
Token.TOKEN_TYPE_RS256 = TOKEN_TYPE_RS256

module.exports = Token