const

  //Repository delegate
  repository = require('../../repository'),
  //Controllers
  userControllers = require('./user')


function APIVersionController(Router, AuthMiddleware) {

  const router = Router()

  router.use('/user', AuthMiddleware(), userControllers.User(Router, repository.user))
  //router.use('/user', AuthMiddleware({passThrough: true}), userControllers.User(Router, repository.user))
  //router.use('/user/{:userId}/collection', userControllers.user)
  //
  return router
}

module.exports = APIVersionController