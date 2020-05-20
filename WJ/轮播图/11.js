function mySwiper(time = 2000) {
  let el = document.querySelector('.wrapper')
  // let pointEl = container.querySelector('.point-container')
  let startX = 0;
  let index = 1
  let moveX = 0;
  let animationMark = false
  let offsetX = 0
  let screenWidth = document.documentElement.offsetWidth
  let itemList = el.querySelectorAll('.swiper-slide')
  let elLength = itemList.length
  let lastTime
  el.appendChild(itemList[0].cloneNode(true));
  el.insertBefore(itemList[`${elLength - 1}`].cloneNode(true), itemList[0]);
  // 初始化展示第一个
  // pointEl.querySelectorAll('li')[0].classList.add('active')

  // 定时器
  let timer = setInterval(autoPlay, time);
  // 触摸开始
  el.addEventListener('touchstart', function (e) {
    startX = e.touches[0].pageX;
    offsetX = el.offsetLeft;
    this.startTime = Date.now()
    animationMark = true
    clearInterval(timer)
  })
  // 触摸中
  el.addEventListener('touchmove', function (e) {
    moveX = e.touches[0].pageX - startX;
    let left = offsetX + moveX
    el.style.transition = 'none';
    el.style.left = left + 'px';
  })
  // 触摸结束
  el.addEventListener('touchend', function (e) {
    let endTime = Date.now()
    // if (endTime - this.startTime < 300) return;
    moveX = e.changedTouches[0].clientX - startX
    // 滑动屏幕宽度三分之一触发
    if (Math.abs(moveX) > screenWidth / 3) {
      // 小于0图片左滑 大于0图片右滑
      if (moveX > 0) {
        index--
      } else {
        index++
      }
    }
    animationMark = false
    timer = setInterval(autoPlay, time)
    render()
  })
  // 移动结束 控制 point 展示
  el.addEventListener('transitionend', function () {
    // let ell = pointEl.querySelectorAll('li')
    // for (let i = 0; i < ell.length; i++) {
    // ell[i].classList.remove('active')
    // }
    // if (index === elLength + 1) {
    // ell[0].classList.add('active')
    // } else {
    // ell[`${index - 1}`].classList.add('active')
    // }
  })
  // 滑动
  function autoPlay() {
    if (animationMark) return;
    index++;
    render();
  }
  // 计算->滑动
  function render() {
    // if (new Date().getTime() - lastTime <= 200) return
    if (animationMark) return;
    el.style.left = (-1) * 360 * index + 'px';
    el.style.transition = 'left .6s';
    setTimeout(() => {
      // 添加判断，防止出界
      if (index <= 0) {
        el.style.transition = 'none';
        index = elLength;
        el.style.left = (-1) * 360 * index + 'px';
      } else if (index > elLength + 1) {
        el.style.transition = 'none';
        index = 1;
        el.style.left = (-1) * 360 * index + 'px';
      }
      animationMark = false;
    }, 100)
  }
}

new mySwiper()