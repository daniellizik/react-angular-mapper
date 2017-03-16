import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { colors } from '~/src/styles/constants'

const ghostStyle = {
  backgroundColor: colors.faded
}

const Ghost = ({root, rows, list, nest, column}) => {
  const pos = column > root
  const sliced = pos ? nest[column - 1] : nest[column + 1]
  const item = list[sliced.find(o => o.active === true).id]
  const msg = pos ? 'dependencies' : 'dependents'
  return (
    <div style={ghostStyle} class="m-4 p-2 card">{item.name} has no {msg}</div>
  )
}

Ghost.propTypes = {
  column: PropTypes.number.isRequired
}

export default connect(s => s, null)(Ghost)
