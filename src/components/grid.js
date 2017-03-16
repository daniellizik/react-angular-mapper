import React from 'react'
import { connect } from 'react-redux'
import Column from '~/src/components/column'


export const rowStyle = {
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  float: 'none',
  flexWrap: 'nowrap',
  fontSize: '12px',
  height: '100%',
  fontFamily: `"Source Code Pro", "Space Mono", Inconsolata, "Liberation Mono", Menlo, Courier, monospace`
}

export const containerStyle = {
  height: '100%',
}

export const reducer = (state, action) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({

})

const ListItem = ({label, val}) => (
  <div>
    <span>{label}:</span>
    <span>{val}</span>
  </div>
)

const Grid = ({list, nest, filters}) => (
  <div style={containerStyle} class="h-scroll container-fluid">
    <div class="row" style={rowStyle}>
      {nest.map((rows, i) => (
        <Column rows={rows} key={i} column={i}/>
      ))}
    </div>
  </div>
)

export default connect(s => s, mapDispatchToProps)(Grid)
