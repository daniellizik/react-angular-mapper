import React, { Component, PropTypes } from 'react'
import Layout from './layout'
import { Provider } from 'react-redux'
import { store } from '~/src/store/index'

export default class App extends Component {
  static propTypes = {
    listener: PropTypes.func.isRequired,
    dispatcher: PropTypes.func.isRequired
  }
  render() {
    return (
      <Provider store={store}>
        <Layout dispatcher={this.props.dispatcher} listener={this.props.listener} />
      </Provider>
    )
  }
}