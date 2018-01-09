// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

function type(obj, type) {
  return (typeof obj) === type;
}

// console.log(type(undefined, 'undefined')); // true
// console.log(type(undefined, 'number')); // false
// console.log(type('hello', 'string')); // true
// console.log(type('hello', 'boolean')); // fase
// console.log(type(true, 'boolean')); // true
// console.log(type(true, 'string')); // false


var stringifyJSON = function(obj) {
  if (type(obj, 'string')) {
    return '"' + obj + '"';
  } else if (type(obj, 'number') || type(obj, 'boolean')) {
    return '' + obj;
  } else if (type(obj, 'undefined') || type(obj, 'function')) {
    return null;
  } else if (obj == null) {
    return 'null';

  // If obj is an array
  } else if (Array.isArray(obj)) {
    return '[' + obj.map(function(elem) {
        return stringifyJSON(elem);
      }).join(',') + ']';

  // If obj is a non-array object (with key-value pairs)
  } else {
    var pairs = [];
    Object.keys(obj).forEach(function(key) {
      var value = stringifyJSON(obj[key]);
      if (value != null) {
        pairs.push(stringifyJSON(key) + ':' + value);
      }
    });
    return '{' + pairs.join(',') + '}';

    // return '{' + Object.keys(obj).map(function(key) {
    //   return stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
    // }).join(',') + '}';
  }
};
