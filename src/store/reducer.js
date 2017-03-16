import defaultState from './state'
import { reducer as layout } from '~/src/containers/layout'
import { reducer as column } from '~/src/components/column'
import { reducer as row } from '~/src/components/row'

function chain(state, action, ...reducers) {
  const result = reducers.reduce((reducedState, reducer) => {
    return reducer(reducedState, action)
  }, state)
  window.result = result
  return result
}

export default function rootReducer(state = defaultState, action) {
  return chain(
    state,
    action,
    layout,
    column,
    row
  )
}
