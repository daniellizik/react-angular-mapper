export default {

  // position of original nested array
  root: 0,

  // active edges
  edges: {
    left: -1,
    right: -1
  },

  // flattened tree
  // has signature like
  // [
  //   [
  //     { id: 1 },
  //     { id, 4, active: true }
  //   ],
  //   [
  //    { id: 5 },
  //    { id: 12, active: true }
  //   ]
  // ]
  nest: [],

  // original list from dependency mapper
  list: []
}
