const EventEmitter = require('events')

class FindUser extends EventEmitter {

  constructor(usersRepository) {
    super()
    this.usersRepository = usersRepository
  }

  execute(userData) {

    this.usersRepository
      .find(query)
      .then(user => {
        this.emit('SUCCESS', user);
      })
      .catch((error) => {
        if (error.message === 'ValidationError') {
          return this.emit('VALIDATION_ERROR', error);
        }
        this.emit('ERROR', error);
      })

  }
}