var isFunction = function(arg) {
  return typeof arg === 'function';
}

var isNumber = function(arg) {
  return typeof arg === 'number';
}

var isObject = function(arg) {
  return typeof arg === 'object' && arg !== null;
}

var isArray = function(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

var isUndefined = function(arg) {
  return arg === void 0;
}

var isNull = function(arg){
  return typeof arg === 'object' && arg == null;
}

var clone = function(target){
  if(target && typeof target === 'object'){
    var newObj = target instanceof Array ? [] : {};
    for(var key in target){
      var val = target[key];
      newObj[key] = arguments.callee(val);
    }
    return newObj;
  }else{
    return target;
  }
}

module.exports = {
  isFunction: isFunction,
  isNumber: isNumber,
  isObject: isObject,
  isArray: isArray,
  isUndefined: isUndefined,
  isNull: isNull,
  clone: clone
}