/**
 * The immutable Value Object for handling a persons name.
 * This is to handle localisation of names across the world
 * in cases where people may have one name or many.
 * This will accept a space seperated string of names and then offer
 * a normalised API for firstName, lastName and middleNames being everything in between
 * @param {String} names The space delimeted list of names.
 */
const Names = (function() {

  function Names(names) {
    // enforces new
    if (!(this instanceof Names)) {
      return new Names(names);
    }

    const allNames = names.split(' '),
      [firstName, ...otherNames] = allNames,
      [lastName = ''] = otherNames.slice(-1)


    Object.defineProperty(this, 'fullName', {
      get: () => {
        return allNames.join(' ')
      },
      enumerable: true
    })

    Object.defineProperty(this, 'firstName', {
      get: () => {
        return firstName
      },
      enumerable: true
    })

    Object.defineProperty(this, 'lastName', {
      get: () => {
        return lastName
      },
      enumerable: true
    })

    Object.defineProperty(this, 'otherNames', {
      get: () => {
        return otherNames.slice(0, -1).join(' ')
      },
      enumerable: true
    })
  }

  /*Names.prototype.methodName = function(args) {
    // method body
  };*/

  return Names;

}());

function parse(fullName) {
  return new Names(fullName)
}

module.exports = {
  parse: parse
}