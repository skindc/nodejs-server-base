/*const
  config = require('../../config')*/

const
  readCommands = require('../../../service/user/read'),
  writeCommands = require('../../../service/user/write')


module.exports = function(Router, repository) {

  const router = Router()

  router.get("/", function(req, res) {

    (new readCommands.GetUserList(repository))
    .on('SUCCESS', (list) => {
        res.status(201).json(list);
      })
      .on('ERROR', (error) => {
        res.status(500).send(error);
      })
      .execute(req.query)

  })


  router.get("/:userId", function(req, res) {

    (new readCommands.FindUser(repository))
      .on('SUCCESS', (user) => {
        res.status(201).json(user);
      })
      .on('NOT_FOUND', (error) => {
        res.status(400).send(error)
      })
      .on('ERROR', (error) => {
        res.status(500).send(error);
      })
      .execute({
        id: req.params.userId
      })

    //var token = req.headers['x-access-token']


  })

  router.post('/', function(req, res) {

    (new writeCommands.CreateUser(repository))
    .on('SUCCESS', (user) => {

        var token = jwt.sign({
          id: user.id
        }, config.secret, {
          expiresIn: 86400
        })

        res.status(201).send({
          auth: true,
          token: token,
          user: user
        })

        //res.status(201).json(user);
      })
      .on('ERROR', (error) => {
        res.status(500).send(error);
      })
      .execute({
        username: req.body.email,
        email: req.body.email,
        password: req.body.password
      })

  })

  return router
}

/*router.post('/login', function(req, res) {
  readService.getUserByUserEmail(req.body.email, { id: 1, email: 1, names: 1, password: 1 })
    .then(
      user => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 })
          return res.status(200).send({ auth: true, token: token, user: { id: user.id } })
        } else {
          return res.status(401).send({ auth: false, token: null })
        }
      }
    )
})*/
