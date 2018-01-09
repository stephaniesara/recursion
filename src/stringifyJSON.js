// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// Returns true if 'obj' is of type 'type'
function type(obj, type) {
  return (typeof obj) === type;
}

// Mimics the JSON.stringify(obj) function
var stringifyJSON = function(obj) {
  if (type(obj, 'string')) {
    return '"' + obj + '"';
  } else if (type(obj, 'number') || type(obj, 'boolean') || (obj === null)) {
    return '' + obj; // Stringifies a non-string primitive or null
  } else if (type(obj, 'undefined') || type(obj, 'function')) {
    return null; // JSON does not stringify undefined or functions

  } else if (Array.isArray(obj)) { // If obj is an array
    return '[' + obj.map(function(elem) {
        return stringifyJSON(elem);
      }).join(',') + ']';

  } else { // If obj is a non-array object with key-value pairs
    var pairs = [];
    Object.keys(obj).forEach(function(key) {
      var value = stringifyJSON(obj[key]);
      if (value != null) {
        pairs.push(stringifyJSON(key) + ':' + value);
      }
    });
    return '{' + pairs.join(',') + '}';
  }
};
