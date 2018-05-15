(function (window) {
  'use strict'
  
  // 1 创建构造函数
  function Game(map) {
    // 添加食物对象
    this.food = new Food()
    // 添加蛇对象
    this.snake = new Snake()

    // 添加map地图属性
    this.map = map
  }

  // 添加渲染游戏中对象的方法
  Game.prototype.render = function () {
    // 1 渲染食物
    this.food.render(this.map)
    // 2 渲染蛇
    this.snake.render(this.map)
  }

  // 绑定按键事件
  Game.prototype.addEvent = function () {
    var that = this
    // 2.1 给 document 绑定按键的事件, 来监听 上下左右 方向键按下的事件
    document.addEventListener('keyup', function (event) {
 
      // 通过事件对象 event 来获取
      // console.log(event.keyCode)
      switch (event.keyCode) {
        case 38:
          // 上
          // 判断方向是不是与当前方向相反，如果相反，就不执行任何错误
          if (that.snake.direction === 'down') {
            return
          }
          that.snake.direction = 'up'
          break
        case 40:
          // 下
          if (that.snake.direction === 'up') {
            return
          }
          that.snake.direction = 'down'
          break
        case 37:
          // 左
          if (that.snake.direction === 'right') {
            return
          }
          that.snake.direction = 'left'
          break
        case 39:
          // 右
          if (that.snake.direction === 'left') {
            return
          }
          that.snake.direction = 'right'
          break
      }
    })
  }

  // 开始游戏，让蛇动起来
  Game.prototype.startGame = function () {
    var that = this
    var timerId = setInterval(function () {
      // that.snake.move(this.map)
      that.snake.move(that.map, that.food)

      // 判断蛇有没有撞墙
      var ret = that.gameOver()
      if (ret) {
        alert('Game Over')
        clearInterval(timerId)
      }
      
    }, 200)
  }

  // 判断游戏是否结束
  Game.prototype.gameOver = function () {
    var isOver = false
    var that = this

    // 1 获取到蛇头坐标
    var head = that.snake.body[0]

    // 2 分别判断上下左右四个边有没有碰墙，如果碰墙了，就提示游戏结束，并且清理定时器
    if (head.x < 0 || head.y < 0 || head.x > ((that.map.offsetWidth / that.snake.width) - 1) || head.y > ((
      that.map.offsetHeight / that.snake.height) - 1)) {
      // alert('Game Over，游戏结束了~')
      // 清理定时器
      // clearInterval(timerId)
      isOver = true
    }

    // 3 判断蛇吃自己
    for (var i = 4; i < that.snake.body.length; i++) {
      // 判断蛇头有没有与蛇节重合，如果重合了，说明蛇吃到自己，游戏就结束
      if (head.x === that.snake.body[i].x && head.y === that.snake.body[i].y) {
        // alert('Game Over，你吃到自己了')
        // clearInterval(timerId)
        isOver = true
      }
    }

    // 这个方法通过返回一个布尔值来确定游戏是否结束
    return isOver
  }

  // 2 给原型对象中添加 开始游戏 的方法
  Game.prototype.start = function () {
    // 渲染游戏中的所有对象：
    this.render()
    
    // 绑定事件
    this.addEvent()
    
    // 开始游戏
    this.startGame()
  }

  window.Game = Game
})(window)
