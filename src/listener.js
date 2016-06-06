/***
 * Welcome to the Tiny Flux Implementation.
 *
 * You should read this guide in the following order:
 *
 * 1. store.js
 * 2. updateState.js
 * 3. listener.js
 * 4. Provider.js
 */


/*
 * The listener.js module is very similar to the store.js module
 * in setup. But just with different intents. Here we are effectively
 * just holding a access to a function, which when called SHOULD update
 * our components with new state.
 */

let _listener; // our internal placeholder

export default {
  /*
   * A simple getter function to retrive the _listener 
   * instance.
   */
  get listener() : Function {
    return _listener;
  },

  /*
   * This function is similar to `injectStore` but it just
   * fills the `_listener` placeholder. Again, this function
   * SHOULD update our components with new state when called
   */
  listen(fn:Function) : void {
    _listener = fn;
  },
};

/*
 * That was easy! Onto the last peice! The Provider.js!
 */
