const EventEmitter = require('events')
const User = require('../../../domain/user').User

class All extends EventEmitter {

  constructor(repository) {
    super()
    this.repository = repository
  }

  execute(query) {

    this.repository
      .list(query)
      .then(list => {
        let users = list.map(function(user) {
          return User.parse(user)
        })
        this.emit('SUCCESS', users)
      })
      .catch((error) => {
        if (error.message === 'ValidationError') {
          return this.emit('VALIDATION_ERROR', error)
        }
        this.emit('ERROR', error)
      })

  }
}

module.exports = All