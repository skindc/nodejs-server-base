var Book = require('../models/book')


module.exports = (express) => {

  const router = express.Router()

  router.route('/:collectionId')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

      var book = new Book({
        title: req.body.book.title,
        author: req.body.book.author
      })

      // save the bear and check for errors
      book.save(function(err) {
        if (err)
          res.send(err)

        res.json({ book: book })
      });

    })

    .get((req, res, next) => {
      if (req.params.collectionId === 'books') {
        Book.find(function(err, books) {
          if (err)
            res.send(err);

          res.json({ data: { list: books } })
        });
      } else {
        res.json({ data: { list: [] } })
      }
    })

  return router

}