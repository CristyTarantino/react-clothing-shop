import { useState, useEffect } from 'react';

let globalState = {};
// contains the list of component listening
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = {...globalState, ...newState};

    for (const listener of listeners) {
      listener(globalState);
    }
  }

  useEffect(() => {
    if (shouldListen) {
      // add set state function to our listeners for a component that users this custom hook
      // when that component mounts and ...
      listeners.push(setState);
    }

    // ...removing it when it un-mounts
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(item => item !== setState)
      }
    }

    // our listeners are set state calls
    // it this way we use the feature of useState that when you call that state updating function useState gives you any component that uses
    // this hook will re-render
  }, [setState, shouldListen])

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = {...globalState, ...initialState}
  }

  actions = {...actions, ...userActions};
}