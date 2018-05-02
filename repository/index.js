const

  uuid = require('node-uuid'),
  //mongoRepo = require('../../mongo/repository')
  //
  users = [{
      email: "info@skinv1.co.uk",
      password: "$2a$10$sTi1y0dvKjyxxaonSU/Mcevog0Y4nIMCN5lLih1lIZUHN/zKP80dK",
      fullName: "Gary Richard Andrew Law"
    },
    {
      email: "sheila@skinv1.co.uk",
      password: "$2a$10$sTi1y0dvKjyxxaonSU/Mcevog0Y4nIMCN5lLih1lIZUHN/zKP80dK",
      fullName: "Sheila"
    }
  ]

dummyUserRepository = {

    list: function(query) {
      return new Promise(
        function(resolve, reject) {
          resolve(users)
        })
    },

    find: function(prequisites, query) {
      return new Promise(
        function(resolve, reject) {
          if (prequisites.email) {
            let user = users.find(user => user.email == prequisites.email)
            if (user) {
              resolve(user)
            }
            else {
              reject(new Error("Not found"))
            }
          }
          reject(new Error("Not enough prequisites"))
        })
    },

    create: function(user) {

      console.log('create user : ', user)

      return new Promise(
        function(resolve, reject) {
          users.push({
            id: uuid.v4(),
            ...user
          })
          resolve(user)
        })
    }
  },

  dummyRepository = {
    user: dummyUserRepository
  }

module.exports = dummyRepository