// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


/*
PSEUDOCODE
Establish empty array of all the result elements
Run a recursive helper function...
For each function call - search one node and its children using .childNodes
If an element's classList contains className, add to results array
If an element doesn't have any more childNodes, return (*base case*)
Note - convert any array-like objects into array using call or apply
*/

var getElementsByClassName = function(className) {
  var results = []; // Array of elements that match className

  // Recursive function searchNode that searches a node for a className match
  function searchNode(node, results, className) {
    var classList = node.classList;
    // Search node's classList for a match to className
    if (classList) {
      var classArray = Array.prototype.slice.call(classList); // Convert to array
      if (classArray.includes(className)) {
        results.push(node);
      }
    }
    // Recursively search all of the node's childNodes
    var childNodes = node.childNodes;
    if (childNodes != null) {
      for (var i = 0; i < childNodes.length; i++) {
        searchNode(childNodes[i], results, className);
      }
    }
  }

  // Begin by searching the document.body node (and all its child nodes...)
  searchNode(document.body, results, className);
  return results;
};




// OLD ITERATION - starts by searching document.childNodes, NOT document.body
//   var results = []; // Array of elements that match className
//
//   function searchNode(node, results, className) {
//     var childList = node.childNodes;
//     var childArray = Array.prototype.slice.call(childList);
//
//     childArray.forEach(function(elem) {
//       var classList = elem.classList;
//       if (classList) {
//         var classArray = Array.prototype.slice.call(classList);
//         if (classArray.includes(className)) {
//           results.push(elem);
//         }
//       }
//       if (elem.childNodes != null) {
//         searchNode(elem, results, className);
//       }
//     });
//   }
//
//   searchNode(document, results, className);
//   return results;
// };
