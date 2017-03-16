import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Grid from '~/src/components/grid'

export const constants = {
  FETCH_LIST_INIT: '@@LAYOUT/FETCH_LIST_INIT',
  FETCH_LIST_SUCCESS: '@@LAYOUT/FETCH_LIST_SUCCESS',
  FETCH_LIST_ERROR: '@@LAYOUT/FETCH_LIST_ERROR',
  FOCUS_DEPENDENCY: '@@LAYOUT/FOCUS_DEPENDENCY'
} 

export const reducer = (state, action) => {
  if (action.type === constants.FETCH_LIST_SUCCESS) {
    const reduced = action.list.reduce((acc, obj, i) => {
      return {
        normalized: [ ...acc.normalized, {...obj, id: i} ],
        denormalized: [ ...acc.denormalized, { id: i } ]
      }
    }, { normalized: [], denormalized: []})
    return {
      ...state,
      list: reduced.normalized,
      nest: [reduced.denormalized]
    }
  }
  if (action.type === constants.FOCUS_DEPENDENCY)
    return {
      ...state,
      list: state.list.map((item, i) => {
        return i === action.index 
          ? { ...item, focused: false } 
          : { ...item, focused: true }
      })
    }
  return state
}

const mapDispatchToProps = (dispatch) => ({
  fetchListInit: () => dispatch(),
  fetchListSuccess: (list) => dispatch({ list, type: constants.FETCH_LIST_SUCCESS })
})

class Layout extends Component {
  static propTypes = {
    listener: PropTypes.func.isRequired,
    dispatcher: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.removeListener = this.props.listener(({data}) => {
      if (data.type === constants.FETCH_LIST_SUCCESS)
        return this.props.fetchListSuccess(data.list)
    })
    this.props.dispatcher({ type: constants.FETCH_LIST_INIT }, this.props.dispatch)
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    return (
      <Grid />
    )
  }
}

export default connect(s => s, mapDispatchToProps)(Layout)
