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
 * Flux has a simple concept. Send your data one way. This tiny implementation
 * uses some of the newer ideas within the flux world, to show you a tiny way
 * to make this easy within React applictions.
 *
 * The goal here is to help demistify flux and make it easier to reason about
 * any flux implementation, whether it's FB flux, redux, coflux, or any other
 * flavor.
 *
 * Here we go!
 *
 * Of course, the tiniest implementation will be a single-store implementation,
 * there are multi-store implementations. These will have their own pros and
 * cons. You get seperation of concerns, but also more to manage. Since we just
 * want you to see the flow, we're going to stick to the single store approach.
 *
 *
 */


/*
 * And this variable is it!
 */

let _store;

/*
 * all we need is a reference. When the application boots up, we'll inject
 * your "default" store. This could be an empty object, or a bootstrapped
 * object with user data and anything else. But really all a store is in
 * simple terms is an object.
 *
 * An object that can be updated. And when updated, it updates your components
 */

/*
 * We have just a little bit of API to setup to make this store usable within
 * the framework:
 *  - A getter (get store)
 *  - A setter (setState())
 *  - An initializer (injectStore())
 */
export default {
  /*
   * "Getting" the store.
   *
   * The only time this should be read from, is when giving to the `Provider`
   * for updating the React component tree.
   */
  get store() {
    return _store;
  },


  /*
   * A REALLY_SIMPLE setState fn. Simply updates keys with values.
   * Values could be anything. This method is used by `updateState` as
   * the internal mechanism for updating values.
   */
  setState(key:string, value:any) : void {
    _store[key] = value;
  },

  /*
   * This is only used at start up time. A one time injection to get the ball
   * rolling on your store shape, based on `Provider.props.store`
   */
  injectStore(store:Object) : Object {
    _store = { ...store };
  },
};

/*
 * Next, let's move onto `updateState`. There we will learn about how state
 * is updated.
 */
