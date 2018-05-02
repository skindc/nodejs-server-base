import test from 'tape'
import User from '../model/User'


test('User function', assert => {
  const actual = typeof User,
    expected = 'function'

  assert.equal(actual, expected, 'User module default should be constructor function.')
  assert.end()
})

test('full name from constructed User ', assert => {
  const user = new User('Bob Robert Downey Roberts'),
    actual = user.fullName,
    expected = 'Bob Robert Downey Roberts'

  assert.equal(actual, expected, 'fullName should be equal to constructor argument')
  assert.end()
})

test('names from constructed User ', assert => {
  const user = new User('Bob Robert Downey Roberts'),
    actual = user.names,
    expected = {
      fullName: 'Bob Robert Downey Roberts',
      firstName: 'Bob',
      lastName: 'Roberts',
      middleNames: 'Robert Downey'
    }

  assert.deepEqual(actual, expected, 'names should be accurate for fullname in constructor argument')
  assert.end()
})


test('User parse function', assert => {
  const actual = typeof User.parse,
    expected = 'function'
  assert.equal(actual, expected, 'User.parse should be function.')
  assert.end()
})

test('full name from parsed User ', assert => {
  const user = User.parse({
      fullName: 'Bob Robert Downey Roberts'
    }),
    actual = user.fullName,
    expected = 'Bob Robert Downey Roberts'

  assert.equal(actual, expected, 'fullName should be equal to fullName property in user literal')
  assert.end()
})

test('names from parsed User ', assert => {
  const user = User.parse({
      fullName: 'Bob Robert Downey Roberts'
    }),
    actual = user.names,
    expected = {
      fullName: 'Bob Robert Downey Roberts',
      firstName: 'Bob',
      lastName: 'Roberts',
      middleNames: 'Robert Downey'
    }

  assert.deepEqual(actual, expected, 'names object should be accurate for fullname of user literal')
  assert.end()
})

/*test('names from User', assert => {

  

})*/