// 生成数独解决方案
import Toolkit from './toolkit'
// const Toolkit = require('./toolkit.js')

export class Generator {
  matrix: number[][] = []
  orders: number[][] = []
  generate(): void {
    while (!this.internalGenerate()) {
      console.log('try again')
    }
  }
  internalGenerate() {
    //  入口方法
    this.matrix = Toolkit.matrix.makeMatrix()
    this.orders = Toolkit.matrix.makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.matrix.shuffle(row))

    // for (let n = 1; n <= 9; n++) { // 填写 1 - 9
    //   if (!this.fillNumber(n)) {
    //     return false
    //   }
    // }
    // return true
    return Array.from({ length: 9 }).every((n, i) => this.fillNumber(i + 1))
  }

  private fillNumber(n: number) {
    return this.fillRow(n, 0)
  }

  /**
   *
   * @param n  值
   * @param rowIndex 行
   */
  private fillRow(n: number, rowIndex: number) {
    // console.log('rowIndex ==== ', rowIndex)
    if (rowIndex > 8) {
      return true
    }

    const row = this.matrix[rowIndex] // 值都为 0 的行
    const orders = this.orders[rowIndex] // 值打乱的行
    // console.log('orders', orders)
    for (let i = 0; i < 9; i++) { // 遍历每一列
      // const colIndex = i
      const colIndex = orders[i] // 列号
      // 如果这个位置已经有值, 跳过
      if (row[colIndex]) {
        // console.log('如果这个位置已经有值, 跳过')
        continue
      }

      // 检查这个位置是否可以填 n
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        // console.log('检查这个位置是否可以填', n)
        continue
      }
      row[colIndex] = n
      // console.log(row)
      // 去下一行填写 n, 如果没填进去, 就继续寻找当前行下一个位置
      // 当前行填写 n 成功, 递归调用 fillRow() 来在下一行中填写 n
      if (!this.fillRow(n, rowIndex + 1)) {
        // console.log('返回false', n , rowIndex + 1)
        row[colIndex] = 0
        continue
      }
      return true
    }
    return false
  }
}

export default Generator

