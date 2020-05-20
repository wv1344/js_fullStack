


/**
 *  * @param {*} options 
 */
function Swiper(options) {
  init(options)
}
function init(options) {
  let el = document.querySelector(options.el)
  let wrapper = el.querySelector('.swiper-wrapper')
  let next = document.getElementById('next')
  let pre = document.getElementById('pre')
  let list = wrapper.querySelectorAll('.swiper-slide')   // 原本 slide 列表
  let num = list.length     // 真实slide数量
  wrapper.appendChild(list[0].cloneNode(true))     //  尾部添加 第一个 slide
  wrapper.insertBefore(list[`${num - 1}`].cloneNode(true), list[0]);  // 头部添加 最后一个 slide
  let totalSlide = num + 2  // 总共slide数量
  let index = 1
  let delay = options.delay ? options.delay : 3000  // 轮播间隔时间
  let speed = 2   // 过度所用时间
  let startX = 0
  let moveX = 0
  let offsetX = 0
  let allSlide = wrapper.querySelectorAll('.swiper-slide')  // 所有 slide 列表
  let swiperWidth = el.offsetWidth     // 滑动的宽度  图片宽度  
  document.min_background_timeout_value = 60

  // 插入 定位点
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
  let lastTime = new Date().getTime()
  wrapper.style.width = `${totalSlide * 100}%`
  wrapper.style.left = `-${swiperWidth}px`
  dotList[0].classList.add('active')


  /**
   * 使用 setTimeout 可以将任务放入任务队列，
   * 并且可以延迟执行，给没有过度的切换渲染的时间，
   * 浏览器不能感知到从最后一张切换到在第一张的过程，所以浏览器会渲染从最后一张过渡到第二张
   * 而不是从第一张过渡到第二张，这就会看起来切换逻辑混乱
   * setTimeout 中的内容会 在等待延迟时间后放入 事件队列，在执行完所有微任务后，执行其中的宏事件
   * 
   * JS事件执行顺序    进入宏任务 -> 执行 -> 执行任务队列微任务 -> 执行任务队列宏任务 -> 执行下一个宏任务
   */
  // 切换
  function change(left) {
    setTimeout(() => {
      wrapper.style.transition = `left ${speed}s`
      if (left) {
        index--
      } else {
        index++
      }
      wrapper.style.left = index * (-1) * swiperWidth + 'px'
    }, 60);
  }

  // 下一张
  function nextFn() {
    if (new Date().getTime() - lastTime <= speed * 1000) return
    if (index >= totalSlide - 1) {  //  到了最后一张
      wrapper.style.transition = 'none'
      wrapper.style.left = `-${swiperWidth}px`
      index = 1
    }
    change()
    lastTime = new Date().getTime()
  }

  // 上一张
  function preFn() {
    if (new Date().getTime() - lastTime <= speed * 1000) return
    if (index <= 0) {
      wrapper.style.transition = 'none'
      wrapper.style.left = `${(totalSlide - 2) * (-1) * swiperWidth}px`
      index = totalSlide - 2
    }
    change(true)
    lastTime = new Date().getTime()
  }

  // 设置 自动轮播
  let timer = setInterval(nextFn, delay)

  // 点击下一张
  next.addEventListener('click', function () {
    clearInterval(timer)
    nextFn()
    timer = setInterval(nextFn, delay)
  })

  // 点击上一张
  pre.addEventListener('click', function () {
    clearInterval(timer)
    preFn()
    timer = setInterval(nextFn, delay)
  })

  // 监听开始点击
  wrapper.addEventListener('touchstart', function (e) {
    if (index <= 0) {
      wrapper.style.transition = 'none'
      wrapper.style.left = `${(totalSlide - 2) * (-1) * swiperWidth}px`
      index = totalSlide - 2
    } else if (index >= totalSlide - 1) {
      wrapper.style.transition = 'none'
      wrapper.style.left = `-${swiperWidth}px`
      index = 1
    }
    startX = e.touches[0].pageX
    offsetX = wrapper.offsetLeft
    clearInterval(timer)
  })

  // 监听 滑动时
  wrapper.addEventListener('touchmove', function (e) {
    moveX = e.touches[0].pageX - startX;
    let left = offsetX + moveX
    wrapper.style.transition = 'none';
    wrapper.style.left = left + 'px';
  })

  // 监听滑动结束
  wrapper.addEventListener('touchend', function (e) {
    let endTime = Date.now()
    // if (endTime - this.startTime < speed*1000) return;
    moveX = e.changedTouches[0].clientX - startX
    // 滑动 swiper 宽度的三分之一触发
    if (Math.abs(moveX) > swiperWidth / 3) {
      // 小于0图片左滑 大于0图片右滑
      if (moveX > 0) {
        preFn()  // 上一张
      } else {
        nextFn()  // 下一张
      }
    } else {
      wrapper.style.transition = `left ${speed}s`
      wrapper.style.left = (-1) * swiperWidth * index + 'px';
    }
    timer = setInterval(nextFn, delay)
  })

  // 监听 slide 切换完毕，更新 标记点 
  wrapper.addEventListener('transitionend', function () {
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
      clearInterval(timer)
      index = de
      change()
      timer = setInterval(nextFn, delay)
    }
  });

  // document.onvisibilitychange = function () {
  //   if (document.visibilityState == "visible") {
  //     timer = setInterval(nextFn, delay);
  //     console.log('set')
  //   } else {
  //     clearInterval(timer);
  //     console.log('clear')
  //   }
  // }

}

new Swiper({
  el: '.swiper1',
  delay: 3000
})

new Swiper({
  el: '.swiper2',
  delay: 3000
})