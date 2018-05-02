import test from 'tape'
import Credentials from '../model/Credentials'

test('Credentials function', assert => {
  const actual = typeof Credentials,
    expected = 'function'
  assert.equal(actual, expected, 'Credentials module default should be constructor function.')
  assert.end()
})

test('Credentials parse function', assert => {
  const actual = typeof Credentials.parse,
    expected = 'function'
  assert.equal(actual, expected, 'Credentials.parse should be function.')
  assert.end()
})

test('email from parsed Credentials ', assert => {
  const credentials = Credentials.parse({
      email: 'bob@roberts.com',
      password: 'bobroberts'
    }),
    actual = credentials.email,
    expected = 'bob@roberts.com'

  assert.equal(actual, expected, 'email should be equal to email property in credentials literal')
  assert.end()
})

test('password from parsed Credentials ', assert => {
  const credentials = Credentials.parse({
      email: 'bob@roberts.com',
      password: 'bobroberts'
    }),
    actual = credentials.password,
    expected = undefined

  assert.equal(actual, expected, 'password should be undefined when inspected')
  assert.end()
})