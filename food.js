(function (window) {
  'use strict'

  function Food(options) {
    // 给对象参数设置默认值
    options = options || {}

    this.width = options.width || 20
    this.height = options.height || 20
    this.x = options.x || 0
    this.y = options.y || 0
    this.bgColor = options.bgColor || 'green'
  }

  // 2 给原型对象添加render方法
  Food.prototype.render = function (target) {
    // 思路：
    // 1 创建食物的DOM对象
    var foodElement = document.createElement('div')
    // 将食物的DOM对象添加给this
    this.foodElement = foodElement

    // 2 给DOM设置样式
    foodElement.style.position = 'absolute'
    foodElement.style.width = this.width + 'px'
    foodElement.style.height = this.height + 'px'
    foodElement.style.backgroundColor = this.bgColor
    // 设置位置
    this.x = parseInt(Math.random() * (target.offsetWidth / this.width))
    this.y = parseInt(Math.random() * (target.offsetHeight / this.height))
    foodElement.style.top = this.y * this.height + 'px'
    foodElement.style.left = this.x * this.width + 'px'

    // 3 将DOM对象追加到页面中
    target.appendChild(foodElement)
  }

  // 暴露Food到window中
  // 只将最核心的 Food 暴露，保证一个JS文件中值暴露一个全局变量
  window.Food = Food
})(window)
