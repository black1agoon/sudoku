// 处理弹出的操作面板

// cell --(click) --> popup
// popup --(click)--> n --(fill)--> cell

export class PopupNumbers {
  private _$panel: JQuery
  private _$targetCell: JQuery = {} as JQuery
  constructor($panel: JQuery) {
    this._$panel = $panel.hide().removeClass('hidden')

    this._$panel.on('click', 'span', e => {
      const $cell = this._$targetCell // 点击迷盘的数字框
      const $span = $(e.target)   // 弹出盘 的数字
      if ($span.hasClass('mark1')) {
        // mark1 回填样式
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1')
        } else {
          $cell.removeClass('mark2').addClass('mark1')
        }
      } else if ($span.hasClass('mark2')) {
        // mark2 回填样式
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2')
        } else {
          $cell.removeClass('mark1').addClass('mark2')
        }
      } else if ($span.hasClass('empty')) {
        // empty 取消数字填写, 取消 mark 样式
        $cell.text(0).addClass('empty')
      } else {
        // 1-9 回填数字
        $cell.removeClass('empty').text($span.text())
      }
      this.hide()
    })
  }

  popup($cell: JQuery) {  // $cell 每一个迷盘中的数字
    this._$targetCell = $cell
    const { left, top } = $cell.position()
    const bodyWidth = $(document.body).width() as number
    // const panelWidth = this._$panel.width()
    // console.log(left, this._$panel.width(), left + this._$panel.width())
    if (left + this._$panel.width()! > bodyWidth) {
      this._$panel.css({
        right: 0,
        top: `${top}px`,
        left: 'initial'
      }).show()
    } else {
      this._$panel.css({
        left: `${left}px`,
        top: `${top}px`
      }).show()
    }
  }

  hide() {
    this._$panel.hide()
  }
}

export default PopupNumbers
