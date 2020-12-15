// 生成九宫格
const ToolKit = require('../core/toolkit.js')
const Generator = require('../core/generator.js')
const Sudoku = require('../core/sudoku.js')
const Checker = require('../core/checker.js')

module.exports = class Grid {
  constructor(container) {
    this._$container = container
  }
  build() {
    // const generator = new Generator()
    // generator.generate()
    // const matrix = generator.matrix

    // const matrix = ToolKit.matrix.makeMatrix()
    // console.log(matrix)  9 * 9 值都是0的矩阵

    const sudoku = new Sudoku()
    sudoku.make()
    const matrix = sudoku.puzzleMatrix
    // const matrix = sudoku.solutionMatrix

    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right']

    const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
      return $('<span>')
        .addClass(colGroupClasses[colIndex % 3])
        .addClass(cellValue ? 'fixed' : 'empty')
        .text(cellValue)
    }))
    // console.log('$cells', $cells)  每个0 被替换成 span
    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[rowIndex % 3])
        .append($spanArray)
    })
    // console.log('$divArray', $divArray) 每一行 被一个div包裹

    this._$container.append($divArray)
  }

  layout() {
    const width = $('span:first', this._$container).width()

    $('span', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      })

    // $(this._$container).height(width)
  }

  bindPopup(popupNumbers) { // popupNumbers 弹出盘
    this._$container.on('click', 'span', e => {
      const $cell = $(e.target) // $cell 每一个迷盘中的数字
      if ($cell.is('.fixed')) {
        return
      }
      popupNumbers.popup($cell)
    })
  }

  /**
   * 重建新的迷盘, 开启新一局
   */
  rebuild() {
    this._$container.empty()
    this.build()
    this.layout()
  }

  /**
   * 检查用户解迷的结果, 成功则进行提示, 失败显示错误位置的标记
   */
  check() {
    // 从界面获取需要检查的数据
    const data = this._$container.children().map((rowIndex, div) => {
      return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0)
    }).toArray().map($data => $data.toArray())

    console.log(data)
    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }

    // 检查不成功, 进行标记
    const marks = checker.matrixMarks
    this._$container.children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span)
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error')
          } else {
            $span.addClass('error')
          }
        })
      })
  }

  /**
   * 重置当前迷盘到初始状态
   */
  reset() {
    this._$container.find('span:not(.fixed)')
      .removeClass('error mark1 mark2')
      .addClass('empty')
      .text(0)
  }

  /**
   * 清理错误标记
   */
  clear() {
    this._$container.find('span.error')
      .removeClass('error')
  }
}
