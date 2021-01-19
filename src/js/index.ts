// const Grid = require('./ui/grid.js')
// const PopupNumbers = require('./ui/popupnumber.js')

import Grid from './ui/grid'
import PopupNumbers from './ui/popupnumber'

const grid = new Grid($('#container'))
const popupNumbers = new PopupNumbers($('#popupNumbers'))

grid.build()
grid.layout()
grid.bindPopup(popupNumbers)

$('#check').on('click', e => {
  if (grid.check()) {
    alert('成功')
  }
})

$('#reset').on('click', e => {
  grid.reset()
})

$('#clear').on('click', e => {
  grid.clear()
})

$('#rebuild').on('click', e => {
  grid.rebuild()
})
