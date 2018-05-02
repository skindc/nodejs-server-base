const Names = require('./Names')

function User(parsedUser) {

  const user = parsedUser

  // enforces new
  if (!(this instanceof User)) {
    return new User(args)
  }

  Object.defineProperty(this, 'firstName', {
    get: () => {
      return user.names.firstName
    },
    enumerable: true
  })

  Object.defineProperty(this, 'lastName', {
    get: () => {
      return user.names.lastName
    },
    enumerable: true
  })

  Object.defineProperty(this, 'otherNames', {
    get: () => {
      return user.names.otherNames
    },
    enumerable: true
  })

  Object.defineProperty(this, 'fullName', {
    get: () => {
      return user.names.fullName
    },
    enumerable: true
  })

  Object.defineProperty(this, 'email', {
    get: () => {
      return user.email
    },
    enumerable: true
  })
}

function ParsedUser(userLiteral) {

  Object.keys(userLiteral).forEach(key => {
    switch (key) {
      case 'fullName':
        this.names = Names.parse(userLiteral.fullName)
        break;
      default:
        this[key] = userLiteral[key]
        break;
    }
  })
}

function parse(userLiteral) {
  return new User(new ParsedUser(userLiteral))
}

function changeUserEmail(user, email) {
  return new User(new ParsedUser({...user, email}))
}

module.exports = {
  parse,
  changeUserEmail
}