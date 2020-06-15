
; (function (window, document) {
  var Message = function (options) {
    if (!(this instanceof Message)) return new Message(options);
    // 默认参数
    this.defaultOpti = {
      message: '',
      type: 'message',
      showClose: false,
      duration: 3000
    }
    this.messageEl = {}
    this.height = 0
    this.options = this.optiCheck(options)
    // 初始化
    this.init()
    // 定时移除
    setTimeout(() => {
      this.remove()
    }, this.options.duration);
  }

  // 初始化
  Message.prototype.init = function () {
    let icon = {
      'message': `<svg t="1592116349096" fill="rgb(144,147,153)" class="msg-icon message-icon" viewBox="0 0 1184 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3915" width="200" height="200"><path d="M670.432 1024a92.96 92.96 0 0 1-50.24-14.976l-264.672-167.904c-1.184-0.832-2.528-1.696-3.584-2.56a68.608 68.608 0 0 0-33.152-8.736H134.72C60.48 829.824 0 758.4 0 670.752v-317.376c0-87.776 60.48-159.04 134.72-159.04h184.064a69.792 69.792 0 0 0 37.536-11.424L620.992 14.976a92.064 92.064 0 0 1 98.528-1.28A124.8 124.8 0 0 1 775.744 121.6l-0.384 184.32-0.416 596.48a125.248 125.248 0 0 1-56.224 107.968 93.088 93.088 0 0 1-48.288 13.632z m357.376-180.48a45.056 45.056 0 0 1-33.024-14.56 51.936 51.936 0 0 1 0-70.144 365.312 365.312 0 0 0 0-493.664 51.936 51.936 0 0 1 0-70.144 44.8 44.8 0 0 1 65.92 0 469.024 469.024 0 0 1 0 633.952 44.576 44.576 0 0 1-32.896 14.56z m0 0l-157.12-114.592a45.056 45.056 0 0 1-33.024-14.528 51.936 51.936 0 0 1 0-70.144 195.936 195.936 0 0 0 0-264.608 51.936 51.936 0 0 1 0-70.144 44.8 44.8 0 0 1 65.92 0 299.84 299.84 0 0 1 0 404.896 44.576 44.576 0 0 1-32.896 14.528z m0 0" p-id="3916"></path></svg>`,
      'warning': `<svg t="1592101525025" fill="rgb(230,162,60)" class="msg-icon warning-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1155" width="200" height="200"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m43.3 652c-9.3 9.1-20 14.6-31.9 16.7-3.8 0.2-7.5 0.3-11.4 0.3s-7.6-0.1-11.4-0.3c-12-2.1-22.6-7.7-31.9-16.7-12.1-11.9-18.1-26.1-18.1-43 0-16.7 6-31.2 18.1-43.3 12.1-12.1 26.6-18.2 43.3-18.2 16.7 0 31.2 6.1 43.3 18.2 12.1 12.1 18.1 26.6 18.1 43.3 0.1 16.8-5.9 31.2-18.1 43z m-13.9-141.3h-57.7c-7-85.4-33-202.8-33-218.8 0-18.3 5.7-33.7 17.2-46.1 11.6-12.5 26.2-18.8 44.2-18.8 17.9 0 32.6 6.2 44.2 18.5 11.5 12.4 17.2 27.8 17.2 46.4 0 16-24 133.4-32.1 218.8z" fill="" p-id="1156"></path></svg>`,
      'success': `<svg t="1592117093247" fill="rgb(103,194,58)" class="msg-icon success-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4692" width="200" height="200"><path d="M512 22C241.38 22 22 241.38 22 512s219.38 490 490 490 490-219.38 490-490S782.62 22 512 22z m259.66 369.85L481.12 682.38c-13.87 13.87-36.36 13.87-50.23 0L252.34 503.83c-13.87-13.87-13.87-36.36 0-50.23 13.87-13.87 36.36-13.87 50.23 0l153.44 153.44 265.42-265.42c13.87-13.87 36.36-13.87 50.23 0 13.87 13.87 13.87 36.36 0 50.23z" p-id="4693"></path></svg>`,
      'error': `<svg t="1592117122615" fill="rgb(245,108,108)" class="msg-icon error-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5441" width="200" height="200"><path d="M512 959.677019c-247.24715 0-447.677019-200.429869-447.677019-447.677019S264.75285 64.322981 512 64.322981c247.248174 0 447.677019 200.429869 447.677019 447.677019S759.246127 959.677019 512 959.677019L512 959.677019zM719.833489 302.497499l-0.005117 0c-20.952194-20.951171-54.92289-20.951171-75.876108 0L510.980787 435.468976 379.694695 304.176744c-20.8734-20.8734-54.712089-20.8734-75.585489 0l-0.005117 0c-20.86726 20.878516-20.86726 54.717206 0 75.590606L435.390181 511.053442 302.492382 643.959428c-20.957311 20.951171-20.957311 54.913681 0 75.864852l0.005117 0c20.945031 20.956288 54.918797 20.956288 75.876108 0l132.892683-132.887566 132.966361 132.971477c20.877493 20.849864 54.717206 20.849864 75.584466 0l0-0.022513c20.8734-20.8734 20.8734-54.694693 0-75.568093L586.851778 511.345084l132.98171-132.977617C740.785683 357.411179 740.785683 323.44867 719.833489 302.497499L719.833489 302.497499z" p-id="5442"></path></svg>`,
    }
    // 准备 DOM 元素
    this.messageEl = document.createElement('div')
    this.messageEl.className += `message-box move-in type-${this.options.type}`
    this.messageEl.innerHTML = `${icon[this.options.type]}<p>${this.options.message}</p>`
    // 插入 DOM
    document.body.appendChild(this.messageEl)
    this.height = this.messageEl.offsetHeight
    // 多个 message 设置 top，避免重叠
    this.messageEl.style.top = `${(this.height + 20) * window.msgIndex + 20}px`
    // 计数 挂载到 window 
    window.msgIndex ? window.msgIndex++ : window.msgIndex = 1
    // 每一个 设置 index
    this.messageEl.dataset.index = window.msgIndex
    // 是否支持手动关闭
    if (this.options.showClose) {
      // 插入元素
      this.messageEl.insertAdjacentHTML('beforeEnd', `<svg t="1592129837853" data-index="${window.msgIndex}" class="msg-close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5564" width="200" height="200"><path d="M220.8 812.8l22.4 22.4 272-272 272 272 48-44.8-275.2-272 275.2-272-48-48-272 275.2-272-275.2-22.4 25.6-22.4 22.4 272 272-272 272z" fill="#707070" p-id="5565"></path></svg>`)
      // 添加监听
      this.messageEl.querySelector('.msg-close-icon').addEventListener('click', (e) => {
        this.remove(e.currentTarget.dataset.index)
      })
    }
  }

  // 移除元素
  Message.prototype.remove = function (index) {
    // 消失动画样式
    this.messageEl.classList.remove('move-in')
    this.messageEl.classList.add('move-out')
    // 消失后 -> 计数
    window.msgIndex && window.msgIndex--
    // 每消失一个，遍历所有 message，使所有 message-box 向上移动
    let list = document.body.querySelectorAll('.message-box')
    for (let i = index ? index : 0; i < list.length; i++) {
      // 调整 受影响的 dataset 
      list[i].dataset.index--
      list[i].lastChild.dataset.index--
      list[i].style.top = `${(this.height + 20) * (list[i].dataset.index - 1) + 20}px`
    }
    // 移除 dom 元素
    this.messageEl.addEventListener('animationend', () => {
      this.messageEl.remove();
    });
  }

  // 尝试 .error 实现
  // Message.prototype.error = function (msg) {
  //   this.options = this.defaultOpti
  //   this.options.message = msg
  //   this.options.type = 'error'
  // }

  // 传入参数校验
  Message.prototype.optiCheck = function (options) {
    let optiType = this.typeCheck(options)
    let typeList = ['message', 'error', 'success', 'warning']
    let opti = {}
    if (optiType === 'object') {
      if (!Object.keys(options).length) this.$error('传入参数为空！')
      if (this.typeCheck(options.message) === 'string') {
        opti.message = options.message
      } else {
        this.$error('message请传入字符串！')
      }
      if (this.typeCheck(options.type) === 'string' && typeList.indexOf(options.type) !== -1) {
        opti.type = options.type
      } else {
        this.$error('传入type错误！')
      }
      opti.showClose = this.typeCheck(!!options.showClose) === 'boolean' ? !!options.showClose : this.defaultOpti.showClose
      if (this.typeCheck(options.duration) === 'number') {
        opti.duration = options.duration
      } else if (!opti.duration) {
        opti.duration = this.defaultOpti.duration
      } else {
        this.$error('传入duration类型错误')
      }
    } else if (optiType === 'string') {
      opti = this.defaultOpti
      opti.message = options
    } else {
      this.$error('传入参数错误！')
    }
    return opti
  }
  // 类型检测
  Message.prototype.typeCheck = function (obj) {
    const typeList = {
      '[object String]': 'string',
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object Array]': 'array',
      '[object Object]': 'object',
      '[object Function]': 'function',
      '[object Math]': 'math',
      '[object Date]': 'date'
    }
    let type = Object.prototype.toString.call(obj)
    return typeList[type]
  }
  // 抛出错误
  Message.prototype.$error = function (msg) {
    throw new Error(msg)
  }
  window.$message = Message
})(window, document);

