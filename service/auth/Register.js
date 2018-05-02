const
  EventEmitter = require('events'),
  User = require('../../domain/user').User

class Register extends EventEmitter {

  constructor(usersRepository) {
    super()
    this.usersRepository = usersRepository
  }

  execute(account, tokenFactory) {

    this.usersRepository
      .create(User.parse(account))
      .then(account => {

        let response = {
          account: account
        }

        response.auth = true

        if (tokenFactory && typeof tokenFactory === 'function') {
          response.token = tokenFactory({
            userID: account.id
          })
        }
        else {
          console.warn('No token factory was provided')
        }

        this.emit('REGISTRATION_SUCCESS', response);

      })
      .catch(error => {
        if (error.message === 'AuthorisationError') {
          return this.emit('REGISTRATION_ERROR', error);
        }
        this.emit('UNKNOWN_ERROR', error);
      })
  }

}

module.exports = Register