var Credentials = (function() {

  function Credentials(...args) {

    const account = (args[0] instanceof ParsedCredentials) ? args[0] : {}

    if (!(this instanceof Credentials)) {
      return new Credentials(args);
    }

    Object.defineProperty(this, 'email', {
      get: () => {
        return account.email
      },
      enumerable: true
    })

    // constructor body
  }

  function ParsedCredentials(userLiteral) {
    Object.keys(userLiteral).forEach(key => {
      this[key] = userLiteral[key]
    })
  }

  function parse(accountLiteral) {
    return new Credentials(new ParsedCredentials(accountLiteral))
  }

  Credentials.parse = parse

  return Credentials;

}());

export default Credentials