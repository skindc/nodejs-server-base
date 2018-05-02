const EventEmitter = require('events')
const User = require('../../../domain/user').User

class CreateUser extends EventEmitter {

  constructor(repository) {
    super()
    this.repository = repository
  }

  execute(user) {

    this.repository
      //Maybe not parse but validate
      .create(User.parse(user))
      .then(created => {
        this.emit('SUCCESS', User.parse(created))
      })
      .catch((error) => {
        if (error.message === 'ValidationError') {
          return this.emit('VALIDATION_ERROR', error)
        }
        this.emit('ERROR', error)
      })
  }
}

module.exports = CreateUser