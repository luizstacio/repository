/**
 *  @module realtime-client/util
 */
class Util {
  /**
   *  @method toString
   *  @description Transform all types in object string
   *  @param {Object} val - Pass the object for transformed.
   *  @return {String} - return string value.
   */
  static toString(val) {
    return Object.prototype.toString.call(val);
  }

  /**
   *  @method isFunction
   *  @description checks if value passed is a Function.
   *  @param {Object} val
   *  @return {Boolean}
   */
  static isFunction(val) {
    return this.toString(val) === '[object Function]';
  }

  /**
   *  @method isString
   *  @description checks if value passed is a String.
   *  @param {Object} val
   *  @return {Boolean}
   */
  static isString(val) {
    return this.toString(val) === '[object String]';
  }

  /**
   *  @method isArray
   *  @description checks if value passed is a Array.
   *  @param {Object} val
   *  @return {Boolean}
   */
  static isArray(val) {
    return this.toString(val) === '[object Array]';
  }

  /**
   *  @method toArray
   *  @description transforms the value passed for Array.
   *  @param {Object} val
   *  @return {Boolean}
   */
  static toArray(val) {
    return Array.prototype.concat.apply([], val);
  }


  /**
   *  @method callback
   *  @description verify if fn passed is a function and exec.
   *  @param {Function} fn - function callback.
   *  @param {Object} scope - execution scope.
   */
  static callback(fn, scope) {
    var args = this.toArray(arguments);

    this.isFunction(fn) ? fn.apply(scope || fn, args.slice(1)) : null;
  }

  /**
   *  @method debounce
   *  @description Create a debounce.
   *  @param {Function} fn - function that needs debounce.
   *  @param {Number} time - time to wait without action.
   *  @return {Function} Executable funcion.
   */
  static debounce(fn, t) {
    var timer;
    
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, t);
    }
  }

  /**
   *  @method extend
   *  @description Create a debounce.
   *  @param {Function} fn - function that needs debounce.
   *  @param {Number} time - time to wait without action.
   *  @return {Function} Executable funcion.
   */
  static extend(obj, obj2) {
    if (!obj2) return obj;

    var keys = Object.keys(obj2);

    keys.forEach((val, key) => {
      obj[key] = val;
    });
  }
}