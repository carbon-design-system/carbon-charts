/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default function getLaunchingDetails(evt) {
  if (!evt || typeof evt === 'function') {
    return {
      launchingElement: null,
      launchingEvent: null
    };
  }

  var launchingElement = evt.delegateTarget || evt.currentTarget || evt;
  var launchingEvent = evt.currentTarget && evt;

  if (launchingElement && !launchingElement.nodeType) {
    throw new TypeError('DOM Node should be given for launching element.');
  }

  if (launchingEvent && !launchingEvent.type) {
    throw new TypeError('DOM event should be given for launching event.');
  }

  return {
    launchingElement: launchingElement,
    launchingEvent: launchingEvent
  };
}