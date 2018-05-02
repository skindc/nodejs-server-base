const
  bcrypt = require('bcrypt-nodejs'),
  EventEmitter = require('events')

/**
 * Find the user by email
 */
class Authorise extends EventEmitter {

  constructor(usersRepository) {
    super()
    this.usersRepository = usersRepository
  }

  execute(credentials, tokenFactory) {

    this.usersRepository
      .find({
        email: credentials.email
      }, {
        id: 1,
        email: 1,
        fullName: 1,
        password: 1
      })
      .then(user => {
        // Match password

        let response = {
          auth: false,
          token: null
        }

        if (bcrypt.compareSync(credentials.password, user.password)) {

          response.user = {
            id: user.id
          }

          response.auth = true

          if (tokenFactory && typeof tokenFactory === 'function') {
            response.token = tokenFactory({
              userId: user.id
            })
          }
          else {
            console.warn('No token factory was provided')
          }

          this.emit('AUTHORISATION_SUCCESS', response);
        }
        else {
          this.emit('AUTHORISATION_FAIL', response);
        }

      })
      .catch((error) => {
        if (error.message === 'AuthorisationError') {
          return this.emit('AUTHORISATION_ERROR', error);
        }
        this.emit('UNKNOWN_ERROR', error);
      })

  }
}

module.exports = Authorise