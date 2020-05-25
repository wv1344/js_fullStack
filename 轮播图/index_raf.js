/**
 * 5月15  开始实现点击直接跳转
 * @param {*} options 
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
  let speed = .3   // 过度所用时间
  let startX = 0
  let moveX = 0
  let offsetX = 0
  let allSlide = wrapper.querySelectorAll('.swiper-slide')  // 所有 slide 列表
  let swiperWidth = el.offsetWidth     // 滑动的宽度  图片宽度  
  document.min_background_timeout_value = 60

  let animation = false


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


  function rightRender() {
    animation = true
    let left = Math.ceil(Number(wrapper.style.left.slice(0, -2)))
    while ((Math.ceil(left) % 25) !== 0) {
      left--
    }
    // 六十帧一秒，0.3s走完?
    if (left > index * (-1) * swiperWidth) {
      wrapper.style.left = `${(left) - 25}px`
      requestAnimationFrame(rightRender)
    } else {
      animation = false
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
    }
  }
  function leftRender() {
    animation = true
    let left = Math.ceil(Number(wrapper.style.left.slice(0, -2)))
    while ((Math.ceil(left) % 25) !== 0) {
      left++
    }
    if (left < index * (-1) * swiperWidth) {
      wrapper.style.left = `${left + 25}px`
      requestAnimationFrame(leftRender)
    } else {
      animation = false
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
    }
  }
  // 切换
  function change(left) {
    if (left) {
      index--
      requestAnimationFrame(leftRender)
    } else {
      index++
      requestAnimationFrame(rightRender)
    }

  }

  // 下一张
  function nextFn() {
    if (animation || window.document.hidden) return
    if (index >= totalSlide - 1) {
      wrapper.style.transition = 'none'
      wrapper.style.left = `-${swiperWidth}px`
      index = 1
    }
    change()
    lastTime = new Date().getTime()
  }

  // 上一张
  function preFn() {
    if (animation) return
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
    if (endTime - this.startTime < 300) return;
    moveX = e.changedTouches[0].clientX - startX
    // 滑动 swiper 宽度的三分之一触发
    if (Math.abs(moveX) > swiperWidth / 4) {
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


  // 监听dot点击
  // 现有问题 -> 点击最后一个下标， 当由是最后一张（倒数第二个div）切换到最后一个div（第一张图片），
  // 会因为是相邻的 div 而导致出现从右往左滑动一张的效果，应该是从左往右由最后一张切换到第一张的
  dotList.forEach((el, de) => {
    el.onclick = function (e) {
      clearInterval(timer)
      console.log(totalSlide)
      console.log(index)
      console.log(de)
      if (de > index) {
        // if (index <= 0) {
        //   wrapper.style.transition = 'none'
        //   wrapper.style.left = `${(totalSlide - 2) * (-1) * swiperWidth}px`
        //   index = totalSlide - 2
        // }
        index = de+1
        requestAnimationFrame(rightRender)
      } else if (de < index) {
        // if (index >= totalSlide - 1) {
        //   wrapper.style.transition = 'none'
        //   wrapper.style.left = `-${swiperWidth}px`
        //   index = 1
        // }
        index = de+1
        requestAnimationFrame(leftRender)
      }
      timer = setInterval(nextFn, delay)
    }
  });

}

new Swiper({
  el: '.swiper1',
  delay: 3000
})

new Swiper({
  el: '.swiper2',
  delay: 3000
})