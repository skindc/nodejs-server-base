import test from 'tape'
import Account from '../model/Account'

test('Account function', assert => {
  const actual = typeof Account,
    expected = 'function'

  assert.equal(actual, expected, 'Account module default should be constructor function.')
  assert.end()
})

test('Account parse function', assert => {
  const actual = typeof Account.parse,
    expected = 'function'
  assert.equal(actual, expected, 'Account.parse should be function.')
  assert.end()
})