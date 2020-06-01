/**
 *  IOS上 translate 闪烁 需要使用 translate3d 
 *  https://www.cnblogs.com/gaoxue/p/3753734.html
 */

/**
 * @param {*} options 
 */
function Swiper(options) {
  this.init(options)
}

Swiper.prototype.init = function (options) {
  let el = document.querySelector(options.el)
  let wrapper = el.querySelector('.swiper-wrapper')
  let list = wrapper.querySelectorAll('.swiper-slide')   // 原本 slide 列表
  let num = list.length     // 真实slide数量
  wrapper.appendChild(list[0].cloneNode(true))     //  尾部添加 第一个 slide
  wrapper.insertBefore(list[`${num - 1}`].cloneNode(true), list[0]);  // 头部添加 最后一个 slide
  let totalSlide = num + 2  // 总共slide数量
  let index = 1
  let loop = options.loop
  let delay = options.delay ? options.delay : 3000  // 轮播间隔时间
  let speed = .3             // 过度所用时间
  let startX = 0
  let moveX = 0
  let offsetX = 0
  let allSlide = wrapper.querySelectorAll('.swiper-slide')  // 所有 slide 列表
  let swiperWidth = el.offsetWidth     // 滑动的宽度  图片宽度    
  let timer       // 定时器
  let isMove = false

  // 插入按钮
  this.nextEl = document.createElement('button')
  this.nextEl.innerHTML = 'next'
  this.nextEl.className = 'next-btn'
  el.appendChild(this.nextEl)
  this.prevEl = document.createElement('button')
  this.prevEl.innerHTML = 'prev'
  this.prevEl.className = 'prev-btn'
  el.appendChild(this.prevEl)

  // 创建 定位点
  let dot = document.createElement('div')
  dot.className = 'pagination'
  for (let i = 0; i < num; i++) {
    let dotEl = document.createElement('span')
    dotEl.classList.add('pagination-bullet')
    dot.appendChild(dotEl)
  }
  wrapper.parentNode.appendChild(dot)
  let dotList = dot.querySelectorAll('.pagination-bullet')

  // 为每一个 slide 设置宽度 避免出现后一张图片
  for (let i = 0; i < totalSlide; i++) {
    allSlide[i].style.width = `${swiperWidth}px`
  }

  // 初始化第一张图参数
  wrapper.style.width = `${totalSlide * 100}%`
  wrapper.style.transform = `translate3d(-${swiperWidth}px,0px,0px)`
  dotList[0].classList.add('active')

  /**
   * 使用 setTimeout 可以将任务放入任务队列，
   * 并且可以延迟执行，给没有过度的切换渲染的时间，
   * 浏览器不能感知到从最后一张切换到在第一张的过程，所以浏览器会渲染从最后一张过渡到第二张
   * 而不是从第一张过渡到第二张，这就会看起来切换逻辑混乱
   * setTimeout 中的内容会 在等待延迟时间后放入 事件队列，在执行完所有微任务后，执行其中的宏事件
   * JS事件执行顺序    进入宏任务 -> 执行 -> 执行任务队列微任务 -> 执行任务队列宏任务 -> 执行下一个宏任务
   */

  // 切换
  function change(left) {
    // 首先顺序执行 跳 -> setTimeout 延迟 60ms 将go推入栈， 正常执行时，延迟的时间足够执行跳到第一张
    // 切换浏览器tab或最小化，setTimeout 也会延迟1000ms以上 推入栈， 
    // 切换回来后，setTimeout中的方法已经推入栈，跳 和 go 将一起执行，导致出现从最后一张过度到第二张的现象

    if (loop) {
      clearInterval(timer)
    }
    isMove = true
    setTimeout(() => {
      wrapper.style.transition = `transform ${speed}s ease-in-out`
      if (left) {
        index--
      } else {
        index++
      }
      wrapper.style.transform = `translate3d(${index * (-1) * swiperWidth}px,0px,0px)`

    }, 60);
  }

  // 设置 自动轮播
  if (loop) {
    timer = setInterval(nextClick, delay)
  }

  function nextClick() {
    if (!isMove) {
      change()
    }
  }

  // 点击下一张
  this.nextEl.addEventListener('click', nextClick)

  // 点击上一张
  this.prevEl.addEventListener('click', function () {
    if (!isMove) {
      change(true)
    }
  })

  // 监听开始点击
  wrapper.addEventListener('touchstart', function (e) {
    console.log('start')
    offsetX = getTranslate(wrapper)
    let h = Math.abs(offsetX + (swiperWidth * num))
    // 判断首尾
    if (index <= 0) {
      wrapper.style.transition = 'none'
      wrapper.style.transform = `translate3d(${(totalSlide - 2) * (-1) * swiperWidth}px,0px,0px)`
      index = totalSlide - 2
    } else if (index >= totalSlide - 1) {
      wrapper.style.transition = 'none'
      wrapper.style.transform = `translate3d(-${swiperWidth - (swiperWidth - h)}px,0px,0px)`
      index = 1
    }
    startX = e.touches[0].pageX
    // offsetX = getTranslate(wrapper)  // 此处获取 offsetX的意义？？？
  })

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

  // 监听 滑动时
  let move = false
  // touchmove 的时候如何 获取 当时的 offsetX ？？？？？
  wrapper.addEventListener('touchmove', function (e) {
    if (!move) {     // 执行一次，获取刚 开始移动时 的 offsetX
      offsetX = getTranslate(wrapper)
      move = true
    }
    console.log(offsetX)
    moveX = e.touches[0].pageX - startX;
    let left = offsetX + moveX
    wrapper.style.transition = 'none';
    wrapper.style.transform = `translate3d(${left}px,0px,0px)`;
    if (loop) {
      clearInterval(timer)
    }
  })

  // 监听滑动结束
  wrapper.addEventListener('touchend', function (e) {
    move = false
    moveX = e.changedTouches[0].clientX - startX
    // 滑动 swiper 宽度的三分之一触发
    if (Math.abs(moveX) > swiperWidth / 4) {
      // 假如滑动超过一张图片宽度 
      if (Math.abs(moveX) > swiperWidth) {
        // 并且 再滑动 四分之一，就直接跳过下一张图片
        if (Math.abs(moveX) > swiperWidth + (swiperWidth / 4)) {
          let a = Math.floor(Math.abs(moveX) / swiperWidth)
          if (moveX < 0) {
            if (index + a === totalSlide - 1) {  // 最后一张，回撤
              wrapper.style.transition = `transform ${speed}s ease-in-out`
              wrapper.style.transform = `translate3d(${(-1) * swiperWidth * index}px,0px,0px)`;
            } else {
              index = index + a
            }
          } else {
            if (index - a === 0) {   // 最前面一张，回撤
              wrapper.style.transition = `transform ${speed}s ease-in-out`
              wrapper.style.transform = `translate3d(${(-1) * swiperWidth * index}px,0px,0px)`;
            } else {
              index = index - a
            }
          }
        } else {  // 不足四分之一，回撤
          wrapper.style.transition = `transform ${speed}s ease-in-out`
          wrapper.style.transform = `translate3d(${(-1) * swiperWidth * index}px,0px,0px)`;
        }
      }
      // 小于0图片左滑 大于0图片右滑
      if (moveX > 0) {
        change(true)  // 上一张
      } else {
        change()  // 下一张
      }
    } else {
      wrapper.style.transition = `transform ${speed}s ease-in-out`
      wrapper.style.transform = `translate3d(${(-1) * swiperWidth * index}px,0px,0px)`;
    }
  })

  // 监听 slide 切换完毕
  wrapper.addEventListener('transitionend', function () {
    isMove = false

    // 判断是否最后一张
    if (index <= 0) {
      wrapper.style.transition = 'none'
      wrapper.style.transform = `translate3d(${(totalSlide - 2) * (-1) * swiperWidth}px,0px,0px)`
      index = totalSlide - 2
    }
    if (index >= totalSlide - 1) {
      wrapper.style.transition = 'none'
      wrapper.style.transform = `translate3d(-${swiperWidth}px,0px,0px)`
      index = 1
    }
    if (loop) {
      timer = setInterval(nextClick, delay)
    }
    // 更新 标记点
    for (let i = 0; i < dotList.length; i++) {
      dotList[i].classList.remove('active')
    }
    if (index === 0 || index === totalSlide - 2) {
      dotList[num - 1].classList.add('active')
    } else if (index === 1 || index === totalSlide - 1) {
      dotList[0].classList.add('active')
    } else {
      dotList[index - 1].classList.add('active')
    }
  })

  // 监听dot点击
  dotList.forEach((el, de) => {
    el.onclick = function (e) {
      console.log('index  ' + index)
      console.log('de  ' + de)
      if (index === 1 && de === 0 || index === 6 && de === 0 || index === de + 1) return
      if (index === totalSlide - 1 && de === 1) {
        if (!isMove) {
          change()
        }
        return
      }
      if (index === 2 && de === 0) {
        if (!isMove) {
          change(true)
        }
        return
      }
      if (index === 0 && de === num - 2) {
        if (!isMove) {
          change(true)
        }
        return
      }
      if (!isMove) {

        if (index > de) {
          console.log(index - de)
          let a = de
          let b = index
          for (let i = b - 1; i >= a + 2; i--) {
            allSlide[i].style.display = 'none'
          }
          wrapper.style.transition = `none`
          wrapper.style.transform = `translate3d(${(-1) * swiperWidth * (a + 2)}px,0px,0px)`;
          index = de
          change()
          setTimeout(() => {
            for (let i = b - 1; i >= a + 2; i--) {
              allSlide[i].style.display = 'block'
            }
          }, speed * 1000);
        } else if (de > index) {
          let a = de
          let b = index
          for (let i = a; i > b; i--) {
            allSlide[i].style.display = 'none'
          }
          wrapper.style.transition = `transform ${speed}s ease-in-out`
          wrapper.style.transform = `translate3d(${(-1) * swiperWidth * (b + 1)}px,0px,0px)`;
          setTimeout(() => {
            for (let i = a; i > b; i--) {
              allSlide[i].style.display = 'block'
            }
            index = de + 1
            wrapper.style.transition = `none`
            wrapper.style.transform = `translate3d(${(-1) * swiperWidth * (a + 1)}px,0px,0px)`;
          }, speed * 1000);
          // 更新标记点
          for (let i = 0; i < dotList.length; i++) {
            dotList[i].classList.remove('active')
          }
          dotList[de].classList.add('active')
        } else {
          index = de
          change()
        }
      }
    }
  });
}

new Swiper({
  el: '.swiper1',
  delay: 1500,
  loop: true
})

new Swiper({
  el: '.swiper2',
  delay: 1000,
  // loop: true
}) 

/**
 * 移动端的
 */