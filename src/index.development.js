import React from 'react'
import { render } from 'react-dom'
import App from 'containers/app'
import { constants } from '~/src/containers/layout'

const child = document.getElementById('slave').contentWindow

const listener = (dispatch) => {
  const listen = ({data, origin}) => {
    if (data.type === constants.FETCH_LIST_SUCCESS) {
      dispatch({
        data: {
          type: constants.FETCH_LIST_SUCCESS,
          list: data.list
        }
      })
    }
  }
  window.addEventListener('message', listen)
  return () => window.removeEventListener('message', listen)
}

const dispatcher = (message, origin, dispatch) => {
  setTimeout(() => {
    child.postMessage(message, '*')
  }, 500)
}

render(<App dispatcher={dispatcher} listener={listener}/>, document.getElementById('root'))