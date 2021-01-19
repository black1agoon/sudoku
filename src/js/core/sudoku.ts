// 生成数独游戏
// 1.生成完成的解决方案, Generator
// 2.随机去除部分数据: 按比例

// const Generator = require('./generator.js')
import Generator from './generator'

export class Sudoku {
  solutionMatrix: number[][]
  puzzleMatrix: number[][] = []
  constructor() {
    // 生成完成的解决方案
    const genterator = new Generator()
    genterator.generate()
    this.solutionMatrix = genterator.matrix
  }

  make(level = 5) {
    // const shouldRid = Math.random() * 9 < level
    // 生成迷盘
    this.puzzleMatrix = this.solutionMatrix.map(row => {
      return row.map(cell => Math.random() * 9 < level ? 0 : cell)
    })
  }
}
export default Sudoku
