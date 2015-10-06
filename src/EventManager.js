/**
 *  @module EventManager
 *  @decription EventManager is a simple event manipulator.
 */
class EventManager {
  constructor () {
    /*
     * @private
     * @config this.eventBuss
     * @description EventBuss is a object that contains events and listeners.
     */
    this.eventBuss = {};
  }

  /**
   *  @method on
   *  @description Add a function in event listener.
   *  @param {String} event - Name of custom event to be listen.
   *  @param {Function} callback - Function for calling in event fired.
   *  @param {Object} callback.data - The data passed for emitter.
   */
  on (event, fn) {
    if ( !Util.isFunction(fn) ) {
      throw(new Error('On parameteres requires is [event: String, callback: Function] your callback is a ' + Util.toString(event)));
    }
    if ( !Util.isString(event) ) {
      throw(new Error('On parameteres requires is [event: String, callback: Function] your event is a ' + Util.toString(event)));
    }

    if ( !this.eventBuss[event] ) this.eventBuss[event] = [];

    this.eventBuss[event].unshift(fn);
  }

  /**
   *  @method unAll
   *  @description Remove all listeners
   *  @param {String} event - Name of custom event.
   */
  unAll (event) {
    this.eventBuss[event] = [];
  }

  /**
   *  @method un
   *  @description Remove a specific listener.
   *  @param {String} event - Name of custom event.
   *  @param {Function} function - Function of listener.
   */
  un (event, fn) {
    var index;

    if ( !this.eventBuss[event] ) return;
    
    index = this.eventBuss[event].indexOf(fn);

    if ( !!~index ) {
      this.eventBuss[event].splice(index, 1);
    }
  }

  /**
   *  @method emit
   *  @description Emit a specific event
   *  @param {String} event - Event name to be fired.
   *  @param {Object} data - Data to be passed to the fired event.
   */
  emit (event, object) {
    try {
      if ( !this.eventBuss[event] ) return;

      this.eventBuss[event].forEach((fn) => {
        Util.callback(fn, object);
      });
    } catch (e) { throw new Error(e.message) };
  }
}