/*
 * Util
 */
exports.isPositiveInteger = function(n) {
  return 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n);
}

exports.lcmArr = function(arr) {
  if(arr.length == 2) {
    return exports.lcm(arr[0], arr[1]);
  } else if(arr.length == 1) {
    return arr[0];
  } else {
    var first = arr[0];
    arr.shift();
    return exports.lcm(first, exports.lcmArr(arr));
  }
}

exports.gcd = function(a, b) {
  let t;
  while(b != 0) {
    t = b;
    b = a % b;
    a = t;
  }
  return a;
}

exports.lcm = function(a, b) {
  return (a * b / exports.gcd(a, b));
}

exports.percent = function(n) {
  return Math.round(n * 10000) / 100;
}
