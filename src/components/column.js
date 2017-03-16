import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Row from '~/src/components/row'
import Ghost from '~/src/components/ghost'
import { colors } from '~/src/styles/constants'

export const constants = {
  COLLAPSE: '@@COLUMN/COLLAPSE'
}

export const xStyle = {
  fontSize: '1.6em',
  fontWeight: 900,
  cursor: 'pointer',
  lineHeight: 0
}

export const columnStyle = (isRoot, i) => ({
  // width: '250px',
  backgroundColor: isRoot ? colors.special : colors.bg,
  borderRight: `1px solid ${i >= 0 ? colors.darkFaded : 'transparent'}`
})

export const reducer = (state, action) => {
  // reduce left or right of root
  if (action.type === constants.COLLAPSE)
    return {
      ...state
    }
  return state
}

const mapDispatchToProps = (dispatch) => ({
  collapse: (column) => dispatch({ type: COLLAPSE, column })
})

const Column = ({collapse, nest, list, rows, column, root, filters}) => (
  <div style={columnStyle(column === root, column)} class="_animated slideInLeft">
    <div class="m-2 p-1">
      <span class="float-right" style={xStyle} onClick={() => collapse()}>×</span>
    </div>
    {rows.length > 0 && rows.map(({id, active}, i) => {
      const item = list[id]
      return <Row active={active} key={i} row={i} column={column} {...item} />
    })}
    {rows.length < 1 && <Ghost column={column}/>}
  </div>
)

Column.propTypes = {
  rows: PropTypes.array.isRequired,
  column: PropTypes.number.isRequired
}

export default connect(s => s, mapDispatchToProps)(Column)
