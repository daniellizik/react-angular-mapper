import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'

export const constants = {
  EXPAND_DEPENDENCIES: '@@ROWGROUP/EXPAND_DEPENDENCIES',
  EXPAND_DEPENDENTS: '@@ROWGROUP/EXPAND_DEPENDENTS'  
}

export const rowStyle = (active) => ({
  backgroundColor: colors.darkBg,
  border: `3px solid ${active ? 'black' : 'transparent'}`
})

export const expandStyle = (textAlign) => ({
  cursor: 'pointer',
  textAlign
})

const setActiveCell = (col, row) => (sliced, i) => {
  // return the same slice
  if (col !== i)
    return sliced
  // set active object in slice (the cell)
  else
    return sliced.map(({id}, j) => {
      return j === row ? {id, active: true} : {id}
    })
}

const setId = (id) => ({id})

// todo: reset nests on non-adjacent column set
export const reducer = (state, action) => {
  const { row, column } = action
  const { left, right } = state.edges
  const dependents = (state.list[action.id] || {dependents: []}).dependents.map(setId)
  const dependencies = (state.list[action.id] || {dependencies: []}).dependencies.map(setId)
  if (action.type === constants.EXPAND_DEPENDENCIES) {
    const edges = {...state.edges, right: column}
    let nest
    // switch tail
    if (column === right)
      nest = [...state.nest.slice(0, -1).map(setActiveCell(column, row)), dependencies]
    // push to end
    else if (column > right)
      nest = [...state.nest.map(setActiveCell(column, row)), dependencies]
    // collapse all right of column
    else if (column < right)
      nest = [...state.nest.slice(0, column + 1).map(setActiveCell(column, row)), dependencies]
    return {...state, nest, edges}
  }
  else if (action.type === constants.EXPAND_DEPENDENTS) {
    let nest
    let edges
    let root = state.root
    // on first try edge and root are always 1
    if (column === 0 && state.nest.length === 1) {
      nest = [dependents, ...state.nest.map(setActiveCell(column, row))]
      edges = {right, left: 1}
      root = state.root + 1
    }
    // after first try edge col is always clicked column + 1
    else if (column !== left && state.nest.length > 1) {
      nest = [dependents, ...state.nest.map(setActiveCell(column, row))]
      edges = {right, left: column + 1}
      root = state.root + 1
    }
    // if col is the same just switch the head
    else if (state.nest.length > 1 && column === left) {
      nest = [dependents, ...state.nest.slice(1).map(setActiveCell(column, row))]
      edges = {right, left: column}
    }
    return { ...state, nest, edges, root }
  }
  return state
}

const mapDispatchToProps = (dispatch) => ({
  expandDependencies: ({id, row, column}) => dispatch({
    type: constants.EXPAND_DEPENDENCIES, id, row, column
  }),
  expandDependents: ({id, row, column}) => dispatch({
    type: constants.EXPAND_DEPENDENTS, id, row, column
  })
})

const Item = ({label, value, expand}) => (
  <div onClick={expand}>
    {label && <span class="label">{label}</span>}
    {value && <span>{value}</span>}
  </div>
)

const Row = (props) => {
  const { active, dependencies, dependents, row, column, edges, module, type, name, root } = props
  const deps = dependencies.length
  const depts = dependents.length
  const isSameRow = row === edges.row
  const isSameCol = column === edges.left || column === edges.right
  const isSameCell = isSameCol && isSameRow
  return (
    <div style={rowStyle(active)} class="card m-4 p-2">
      <Item label="module: " value={module}/>
      <Item label="type: " value={type}/>
      <Item label="name: " value={name}/>
      <div>
        {column <= root && <span
          class="mr-2"
          style={expandStyle('left')} 
          onClick={() => !isSameCell && props.expandDependents(props)}>
          &lt; required by
        </span>}
        {column >= root && <span
          class="ml-2"
          style={expandStyle('right')} 
          onClick={() => !isSameCell && props.expandDependencies(props)}>
          requires &gt;
        </span>}
      </div>
    </div>
  )
}

Row.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}

export default connect(s => s, mapDispatchToProps)(Row)
