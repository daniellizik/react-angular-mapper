import React from 'react'
import { render } from 'react-dom'
import App from 'containers/app'

/**
 * @param {function} listener - handler for receiving async events
 * @param {function} dispatcher - handler for dispatching async events
 * @param {string} rootId - id of html element to mount root component
 */
export default ({listener, dispatcher, rootId}) => {
  render(<App dispatcher={dispatcher} listener={listener}/>, document.getElementById(rootId))
}