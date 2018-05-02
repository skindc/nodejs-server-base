var Account = (function() {

  function Account(...args) {

    const account = (args[0] instanceof ParsedAccount) ? args[0] : {}

    if (!(this instanceof Account)) {
      return new Account(args);
    }

    // constructor body
  }

  function ParsedAccount(userLiteral) {
    Object.keys(userLiteral).forEach(key => {
      /*switch (key) {
        case 'fullName':
          this.names = new Names(userLiteral.fullName)
          break;
        default:
          this[key] = userLiteral[key]
          break;
      }*/
    })
  }

  function parse(accountLiteral) {
    return new Account(new ParsedAccount(accountLiteral))
  }

  Account.parse = parse

  return Account;
  
}());

export default Account