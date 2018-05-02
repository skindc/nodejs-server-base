import test from 'tape'
import Names from '../model/Names'

/*import tapeTest from 'tape'
import tapePromise from 'tape-promise'
const test = tapePromise(tapeTest) // decorate tape*/


test('Names function', assert => {
  const actual = typeof Names,
    expected = 'function'

  assert.equal(actual, expected, 'Names module default should be constructor function.')
  assert.end()
})


test('full name from Names instance', assert => {

  const names = new Names('Bob Robert Downey Roberts'),
    actual = names.fullName,
    expected = 'Bob Robert Downey Roberts'

  assert.equal(actual, expected, 'fullName should be string of all names.')
  assert.end()

})

test('first name from Names instance', assert => {

  const names = new Names('Bob Robert Downey Roberts'),
    actual = names.firstName,
    expected = 'Bob'

  assert.equal(actual, expected, 'firstName should be the first string of all names.')
  assert.end()

})

test('last name from Names instance', assert => {

  const names = new Names('Bob Robert Downey Roberts'),
    actual = names.lastName,
    expected = 'Roberts'

  assert.equal(actual, expected, 'lastName should be the last string of all names.')
  assert.end()

})

test('last names from Names instance when 1 name', assert => {

  const names = new Names('Bob'),
    actual = names.lastName,
    expected = ''

  assert.equal(actual, expected, 'lastName should be a an empty string when names is only 1 in length.')
  assert.end()

})

test('middle names from Names instance', assert => {

  const names = new Names('Bob Robert Downey Roberts'),
    actual = names.middleNames,
    expected = 'Robert Downey'

  assert.equal(actual, expected, 'middleNames should be a concatenated string of of all names except first and last.')
  assert.end()

})

test('middle names from Names instance when 1 name', assert => {

  const names = new Names('Bob'),
    actual = names.middleNames,
    expected = ''

  assert.equal(actual, expected, 'middleNames should be a an empty string when names is only 1 in length.')
  assert.end()

})