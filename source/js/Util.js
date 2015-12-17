/*
 * Util
 */
import color from './RandomColor';

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

exports.colorSet = function() {
  let c = color({luminosity: 'light'});
  return [c, exports.shade(c, -.20), exports.shade(c, -.60)]
}

exports.shade = function (color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
