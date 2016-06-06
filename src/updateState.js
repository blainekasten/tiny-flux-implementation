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
 * This is the main part of the flux implementation you would engage with.
 * In redux, this would be equivalent to a reducer. Or in normal flux it
 * would be an action.
 *
 * Though in this implementation, it is simply a function that takes an
 * object of keys and values to update your state.
 *
 * This is really where the unidirectional data flow comes from. You'll see
 * in a minute what I mean. Just to prepare you for it, this is how you 
 * might use this function:
 *
 * ```js
 * import { updateState } from 'tiny-flux-implementation';
 *
 * render() {
 *   return (
 *     <div onClick={() => {
 *       updateState({foo: 'bar'});
 *     }}>
 *       Click me!
 *     </div>
 *   );
 * }
 * ```
 */


import { listener } from './listener';
/*
 * This listener is one of the most important parts here. It is basically
 * a proxy to a `setState` function of a Higher-Order React Component `Provider`.
 * Any time you call this function it will try to re-render everything.
 * That will be explained in a while through the `Provider` class.
 *
 * This listener will be the last function called by `updateState`
 */


import { setState, store } from './Store';
/*
 * We need access to the store and our `setState()` method so we can 
 * actually update the internal `_store` instance we found in store.js.
 */

/*
 * This is the first public API. The glorious function to update our
 * store that we described. Like stated, it takes an object in. Let's
 * see what it does.
 */
function updateState(stateUpdateObject:Object) : void {
  /*
   * It's a really simple API. It does 2 things.
   *
   * 1. Update the internal _store.
   * 2. Call our `listener` proxy.
   *
   * We loop over the object and call `setState` with each
   * key and value. Of course this doesn't do deep setting. It only will
   * set at the top level of an object. So if you are updating something 
   * deep in the tree, you'll have to have access to the top element when
   * passing in.
   */
  for (const stateKeyToUpdate:string in stateUpdateObject) {
    if (!stateUpdateObject.hasOwnProperty(stateKeyToUpdate)) {
      continue;
    }

    setState(
      stateKeyToUpdate,                   // key
      stateUpdateObject[stateKeyToUpdate] // value
    );
  }

  /*
   * At this point, the `store` getter has been updated with the new state
   * So we now call `listener` to let your react components know about the
   * updated state.
   */
  listener(
    { ...store },
  );
}

export default updateState

/*
 * At this point we're going to move over to listener.js just so you can see
 * what the listener looks like.
 */
