/**
 *  IOS上 translate 闪烁 需要使用 translate3d 
 *  https://www.cnblogs.com/gaoxue/p/3753734.html
 */

/**
 * @param {*} options 
 */
function Swiper(options) {

  this.defaultOptions = {
    el: '',
    urlList: [''],
    delay: 3000,
    loop: false,
    speed: 300,
    controlBtn: false,
    dotClick: false
  }
  // 校验
  this.options = this.formatOptions(options)

  // 全局变量
  this.el = document.querySelector(this.options.el)
  this.index = 1
  this.num = this.options.urlList.length
  this.totalSlide = this.num + 2
  this.isMove = false
  this.startX = 0
  this.moveX = 0
  this.offsetX = 0
  this.swiperWidth = this.el.offsetWidth
  this.wrapper = null
  this.allSlide = null
  this.dotList = null

  // 挂载DOM
  this.initDom()

  //是否需要 按钮
  if (this.options.controlBtn) {
    this.initControlBtn()
  }

  // 初始化监听
  this.initListener(options)

  // 是否 自动播放
  if (this.options.loop) {
    this.setAutoPlay()
  }

  // 是否点击 下标跳转
  if (this.options.dotClick) {
    this.clickDot()
  }
}
// 设置过度
Swiper.prototype.setTransition = function (time, distance) {
  this.wrapper.style.transition = typeof (time) === 'number' ? `transform ${time}ms ease-in-out` : 'none'
  this.wrapper.style.transform = `translate3d(${distance}px,0px,0px)`
}
Swiper.prototype.$error = function(msg){
  throw new Error(msg)
}
// 校验
Swiper.prototype.formatOptions = function (options) {
  options ? options : this.$error('请传入参数')
  const _options = Object.create(null)
  if(options.urlList && Array.isArray(options.urlList)){
    options.urlList.forEach(item => {
      if( !(Object.prototype.toString.call(item) === '[object String]'&& item.length)){
        this.$error('图片传入格式错误')
      }
    })
    options.urlList.length ? _options.urlList = options.urlList : this.$error('图片列表为空')
  } else {
    this.$error('图片传入格式错误')
  }
  if(options.el&&Object.prototype.toString.call(options.el)&& options.el.length&&document.querySelector(options.el)){
    _options.el = options.el
  }else {
    this.$error('el挂载点错误')
  }

  _options.loop = Object.prototype.toString.call(!!options.loop) === '[object Boolean]' ? !!options.loop : this.defaultOptions.loop

  _options.delay = Object.prototype.toString.call(+options.delay) === '[object Number]' ? +options.delay : this.defaultOptions.delay
  
  _options.speed = Object.prototype.toString.call(+options.speed) === '[object Number]' ? +options.speed : this.defaultOptions.speed

  _options.controlBtn = Object.prototype.toString.call(!!options.controlBtn) === '[object Boolean]' ? !!options.controlBtn : this.defaultOptions.controlBtn

  _options.dotClick = Object.prototype.toString.call(!!options.dotClick) === '[object Boolean]' ? !!options.dotClick : this.defaultOptions.dotClick
  return _options
}
// 按钮
Swiper.prototype.initControlBtn = function () {
  let _ = this
  const nextSvg = `<svg width="20" height="40"><polyline points="0,0 20,20 0,40" fill="none" stroke="white" stroke-width="3" /> </svg>`
  const prevSvg = `<svg width="20" height="40"><polyline points="20,0 0,20 20,40" fill="none" stroke="white" stroke-width="3" /> </svg>`
  // 插入按钮
  this.nextEl = document.createElement('span')
  this.nextEl.innerHTML = nextSvg
  this.nextEl.className = 'next-btn'
  this.el.appendChild(this.nextEl)
  this.prevEl = document.createElement('span')
  this.prevEl.innerHTML = prevSvg
  this.prevEl.className = 'prev-btn'
  this.el.appendChild(this.prevEl)
  // 事件监听
  this.nextEl.addEventListener('click', function () {
    if (!_.isMove) {
      _.move()
    }
  })
  this.prevEl.addEventListener('click', function () {
    if (!_.isMove) {
      _.move(true)
    }
  })
}
// 初始化DOM
Swiper.prototype.initDom = function () {
  // 插入 dom
  this.el.classList.add('swiper')
  this.wrapper = document.createElement('div')
  this.wrapper.classList.add('swiper-wrapper')
  this.options.urlList.unshift(this.options.urlList[this.num - 1])
  this.options.urlList.push(this.options.urlList[1])
  for (let i = 0; i < this.options.urlList.length; i++) {
    this.wrapper.innerHTML += `<div class="swiper-slide">
      <img src="${this.options.urlList[i]}" />
    </div>`
  }
  this.el.appendChild(this.wrapper)
  this.allSlide = this.wrapper.querySelectorAll('.swiper-slide')  // 所有 slide 列表
  // 创建插入 定位点
  let dot = document.createElement('div')
  dot.className = 'pagination'
  for (let i = 0; i < this.num; i++) {
    let dotEl = document.createElement('span')
    dotEl.classList.add('pagination-bullet')
    dot.appendChild(dotEl)
  }
  this.wrapper.parentNode.appendChild(dot)
  this.dotList = dot.querySelectorAll('.pagination-bullet')
  // 为每一个 slide 设置宽度 避免出现后一张图片
  for (let i = 0; i < this.totalSlide; i++) {
    this.allSlide[i].style.width = `${this.swiperWidth}px`
  }
  // 初始化第一张图参数
  this.wrapper.style.width = `${this.totalSlide * 100}%`
  this.wrapper.style.transform = `translate3d(-${this.swiperWidth}px,0px,0px)`
  this.dotList[0].classList.add('active')
}
// 切换
Swiper.prototype.move = function (left) {
  // 切换
  if (this.options.loop) clearInterval(this.timer)
  this.isMove = true
  setTimeout(() => {
    left ? this.index-- : this.index++
    this.setTransition(this.options.speed, this.index * (-1) * this.swiperWidth)
  }, 60);
}
// 监听
Swiper.prototype.initListener = function () {
  let _ = this
  let isTouchMove = false

  // 获取当前 translate 位置
  function getTranslate(el, axis) {
    if (axis === void 0) axis = 'x';

    var matrix;
    var curTransform;
    var transformMatrix;

    var curStyle = window.getComputedStyle(el, null);

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }
    return curTransform || 0;
  }

  // 监听开始点击
  _.wrapper.addEventListener('touchstart', function (e) {
    _.offsetX = getTranslate(_.wrapper)
    let h = Math.abs(_.offsetX + (_.swiperWidth * _.num))
    // 判断首尾
    if (_.index <= 0) {
      _.setTransition('none', (_.totalSlide - 2) * (-1) * _.swiperWidth)
      _.index = totalSlide - 2
    } else if (_.index >= _.totalSlide - 1) {
      _.setTransition('none', -(_.swiperWidth - (_.swiperWidth - h)))
      _.index = 1
    }
    _.startX = e.touches[0].pageX
  })

  // 监听 滑动时
  _.wrapper.addEventListener('touchmove', function (e) {
    if (!isTouchMove) {     // 执行一次，获取刚 开始移动时 的 offsetX
      _.offsetX = getTranslate(_.wrapper)
      isTouchMove = true
    }
    _.moveX = e.touches[0].pageX - _.startX;
    let left = _.offsetX + _.moveX
    _.setTransition('none', left)
    if (_.options.loop) clearInterval(_.timer)
  })

  // 监听滑动结束
  _.wrapper.addEventListener('touchend', function (e) {
    isTouchMove = false
    _.moveX = e.changedTouches[0].clientX - _.startX
    // 滑动 swiper 宽度的几分之一触发
    if (Math.abs(_.moveX) > _.swiperWidth / 4) {
      // 假如滑动超过一张图片宽度 
      if (Math.abs(_.moveX) > _.swiperWidth) {
        // 并且 再滑动 四分之一，就直接跳过下一张图片
        if (Math.abs(_.moveX) > _.swiperWidth + (_.swiperWidth / 4)) {
          let a = Math.floor(Math.abs(_.moveX) / _.swiperWidth)
          if (_.moveX < 0) {
            if (_.index + a === _.totalSlide - 1) {  // 最后一张，回撤
              _.setTransition(_.options.speed, (-1) * _.swiperWidth * _.index)
            } else {
              _.index = _.index + a
            }
          } else {
            if (_.index - a === 0) {   // 最前面一张，回撤
              _.setTransition(_.options.speed, (-1) * _.swiperWidth * _.index)
            } else {
              _.index = _.index - a
            }
          }
        } else {  // 不足四分之一，回撤
          _.setTransition(_.options.speed, (-1) * _.swiperWidth * _.index)
        }
      }
      // 小于0图片左滑 大于0图片右滑
      _.moveX > 0 ? _.move(true) : _.move()
    } else {
      _.setTransition(_.options.speed, (-1) * _.swiperWidth * _.index)
    }
  })

  // 监听 slide 切换完毕
  _.wrapper.addEventListener('transitionend', function () {
    _.isMove = false
    // 判断是否最后一张
    if (_.index <= 0) {
      _.setTransition('none', (_.totalSlide - 2) * (-1) * _.swiperWidth)
      _.index = _.totalSlide - 2
    }
    if (_.index >= _.totalSlide - 1) {
      _.setTransition('none', (-1) * _.swiperWidth)
      _.index = 1
    }
    if (_.options.loop) {
      _.setAutoPlay()
    }
    // 更新 标记点
    for (let i = 0; i < _.dotList.length; i++) {
      _.dotList[i].classList.remove('active')
    }
    if (_.index === 0 || _.index === _.totalSlide - 2) {
      _.dotList[_.num - 1].classList.add('active')
    } else if (_.index === 1 || _.index === _.totalSlide - 1) {
      _.dotList[0].classList.add('active')
    } else {
      _.dotList[_.index - 1].classList.add('active')
    }
  })
}
// 自动播放
Swiper.prototype.setAutoPlay = function () {
  let _ = this
  this.timer = setInterval(function () {
    if (!_.isMove) {
      _.move()
    }
  }, this.options.delay)
}
// 下标点击
Swiper.prototype.clickDot = function () {
  let _ = this
  _.dotList.forEach((el, de) => {
    el.onclick = function (e) {
      console.log('index  ' + _.index)
      console.log('de  ' + de)
      if (_.index === 1 && de === 0 || _.index === 6 && de === 0 || _.index === de + 1) return
      if (_.index === _.totalSlide - 1 && de === 1) {
        if (!_.isMove) {
          _.move()
        }
        return
      }
      if (_.index === 2 && de === 0 || _.index === 0 && de === _.num - 2) {
        if (!_.isMove) {
          _.move(true)
        }
        return
      }
      if (!_.isMove) {
        if (_.index > de) {
          console.log(_.index - de)
          let a = de
          let b = _.index
          for (let i = b - 1; i >= a + 2; i--) {
            _.allSlide[i].style.display = 'none'
          }
          _.setTransition('none', (-1) * _.swiperWidth * (a + 2))
          _.index = de
          _.move()
          setTimeout(() => {
            for (let i = b - 1; i >= a + 2; i--) {
              _.allSlide[i].style.display = 'block'
            }
          }, _.options.speed);
        } else if (de > _.index) {
          let a = de
          let b = _.index
          for (let i = a; i > b; i--) {
            _.allSlide[i].style.display = 'none'
          }
          _.setTransition(_.options.speed, (-1) * _.swiperWidth * (b + 1))
          setTimeout(() => {
            for (let i = a; i > b; i--) {
              _.allSlide[i].style.display = 'block'
            }
            _.index = de + 1
            _.setTransition('none', (-1) * _.swiperWidth * (a + 1))
          }, _.options.speed);
          // 更新标记点
          for (let i = 0; i < _.dotList.length; i++) {
            _.dotList[i].classList.remove('active')
          }
          _.dotList[de].classList.add('active')
        } else {
          _.index = de
          _.move()
        }
      }
    }
  });
}

new Swiper({
  urlList: [
    './images/md5z28.jpg',
    './images/13vym3.jpg',
    './images/g866qq.jpg'
  ],
  el : '.swiper1',
  delay: '1000',
  loop: '1',
  speed:'300'
})

// new Swiper({
//   urlList: [
//     './images/md5z28.jpg',
//     './images/13vym3.jpg',
//     './images/g866qq.jpg'
//   ],
//   el: '.swiper2',
//   delay: 1500,
//   speed: 300,
//   loop: true,
//   dotClick: true,
//   controlBtn: true
// })

