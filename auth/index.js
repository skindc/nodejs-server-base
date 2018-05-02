const
  commands = require('../service/auth/'),
  userRepository = require('../repository').user

function Controller(Router, tokenFactory) {

  const router = Router()

  router.post("/login", function(req, res) {

    new commands.Authorise(userRepository, tokenFactory)
      .on('AUTHORISATION_SUCCESS', (response) => {
        res.status(200).json(response);
      })
      .on('AUTHORISATION_FAIL', (response) => {
        console.log('AUTHORISATION_FAIL response : ', response)
        res.status(401).send(response)
      })
      .on('AUTHORISATION_ERROR', (error) => {
        console.log('AUTHORISATION_ERROR error : ', error)
        res.status(400).send(error)
      })
      .on('UNKNOWN_ERROR', (error) => {
        console.log('UNKNOWN_ERROR error : ', error)
        res.status(500).send(error);
      })
      .execute({
        email: req.body.email,
        password: req.body.password
      }, tokenFactory)
  })

  router.post("/register", function(req, res) {

    new commands.Register(userRepository, tokenFactory)
      .on('REGISTRATION_SUCCESS', (response) => {
        res.status(200).json(response);
      })
      .on('REGISTRATION_ERROR', (error) => {
        console.log('REGISTRATION_ERROR error : ', error)
        res.status(400).send(error)
      })
      .on('UNKNOWN_ERROR', (error) => {
        console.log('UNKNOWN_ERROR error : ', error)
        res.status(500).send(error);
      })
      .execute(req.body, tokenFactory)
      /*.execute({
        email: req.body.email,
        password: req.body.password
      }, tokenFactory)*/
  })

  return router

}

module.exports = Controller