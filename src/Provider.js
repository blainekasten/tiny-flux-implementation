/***
 * Welcome to the Tiny Flux Implementation.
 * 
 * You should read this guide in the following order:
 *
 * 1. store.js
 * 2. Provider.js
 * 3. listener.js
 * 4. updateState.js
 */

/*
 * Here we are! The final stop. This is the part that hooks everything together.
 * If you haven't used something like coflux or redux-react before, and you
 * haven't heard of React's `context` feature, you should go read up on it quick:
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * We are going to use `context` as an easy way to update your react components
 * with new state values.
 *
 * Below you'll see that Provider is imply a React Component. It is a Higher Order
 * React Component. That simply means it sits higher in the tree, to setup necassary
 * parts for lower parts of the tree. 
 *
 * This implementation is designed to be the top-most component. So a normal
 * implementation would look like this:
 *
 * ```js
 * import { Provider } from 'tiny-flux-implementation';
 * import ReactDOM from 'react-dom';
 *
 * const defaultStore = {};
 *
 * ReactDOM.render(
 *   <Provider store={defaultStore}>
 *     <MyApp />
 *   </Provider>,
 *   domNode
 * );
 * ```
 *
 * The defaultStore is what gets put into `injectStore`. You could have this be
 * any shape that makes sense to bootstrap your application.
 *
 * Let's look at the details
 */

import React, { PropTypes, Children } from 'react';
// get React, duh!


import { listen } from './listener';
/*
 * Here we get that `listen` function. So we can provide the method that 
 * updates our react components
 */


import { injectStore } from './store';
/*
 * We also need to inject the store provided.
 */


export default class Provider extends React.Component {

  /*
   * Our Provider component has 2 propTypes. The children that actually
   * get rendered, and the defaultStore.
   */
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  /*
   * This is part of the `context` API from React. It's a validator
   * of shape, similar to `propTypes`
   *
   * We are going to pass the `store` through all components.
   */
  static childContextTypes = {
    store: PropTypes.object.isRequired,
  };

  /*
   * In our constructor, we will do 3 things:
   *
   * 1. set up the store (injectStore)
   * 2. Set up state with the store for initial render
   * 3. Set up our listener
   */
  constructor(props:Object) : void {
    super(props);

    injectStore(props.store);

    this.state = {
      props.store || {},
    };

    listen(newState => this.setState({store: newState}));
    /*
     * You'll notice we are using the generic `setState` method
     * from React. This is what gives us the ability to update the entire
     * tree whenever the state changes. If you remember,
     * this listener is called as a result of `updateState`.
     *
     * So any time `updateState` is called, this `listener` is called,
     * and then `setState` is called. Triggering the react cycle!
     */
  }

  /*
   * This is the other part of the React `context` API. This will be
   * called everytime `setState` is called by the `listen`er. So we
   * make sure to give all children the current values of the store.
   */
  getChildContext():Object {
    return {
      store: this.state.store,
    };
  }

  /*
   * Lastly, we're going to render whatever children come in.
   * This component is purely functional and not at all visual.
   */
  render() : React.DOM {
    return this.props.children || null;
  }
}

/*
 * That's it! There is nothing else to it!
 *
 * Large thanks to @iamdustan and @thejameskyle for inspiration to build this.
 * It was created from my learnings when building `coflux`. It's very similar
 * under the hood.
 *
 * Thanks and hope this was helpful!
 */
