/**
 * @param {*} options 
 */
function Swiper(options) {
  this.init(options)
}

Swiper.prototype.init = function(options) {
  let el = document.querySelector(options.el)
  let wrapper = el.querySelector('.swiper-wrapper')
  let next = document.getElementById('next')
  let pre = document.getElementById('pre')
  let list = wrapper.querySelectorAll('.swiper-slide')   // 原本 slide 列表
  let num = list.length     // 真实slide数量
  wrapper.appendChild(list[0].cloneNode(true))     //  尾部添加 第一个 slide
  wrapper.insertBefore(list[`${num - 1}`].cloneNode(true), list[0]);  // 头部添加 最后一个 slide
  let totalSlide = num + 2  // 总共slide数量
  let index = 0
  let loop = options.loop
  let delay = options.delay ? options.delay : 3000  // 轮播间隔时间
  let speed = .3          // 过度所用时间
  let startX = 0
  let moveX = 0
  let offsetX = 0
  let allSlide = wrapper.querySelectorAll('.swiper-slide')  // 所有 slide 列表
  let swiperWidth = el.offsetWidth     // 滑动的宽度  图片宽度    
  let timer       // 定时器
  let animation = false

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
  dotList[0].classList.add('active')

  allSlide[0].classList.add('active')

  let $active
  // 切换
  function slide(index,type) {
    console.log(index)
    allSlide[index].classList.add(`item-${type}`)
    allSlide.forEach(el => {
      if(Array.prototype.slice.call(el.classList).find(item => item === 'active')){
        $active = el
        el.classList.add(`item-${type}`)
      }
    });
    $active.addEventListener('transitionend',function(){
      console.log(index)
      $active.classList.remove('active')
      $active.classList.remove(`item-${type}`)
      allSlide[index].classList.remove(`item-${type}`)
      allSlide[index].classList.add('active')
    })

  }

  this.nextEl.addEventListener('click',function(){
    index = index + 1
    slide(index,'right')
  })
  this.prevEl.addEventListener('click',function(){
    index = index - 1
    slide(index,'left')
  })


}



new Swiper({
  el: '.swiper2',
  delay: 2000,
  loop: true
})