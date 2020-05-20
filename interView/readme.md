
new 实现  promise 实现
位移运算 >> 1 除二
promise.all promise.race

# index.js 腾讯面试  

# 对 es6 的理解
  es6 相对于 es5  ECMAScript 的第六次修订 ES2015 随着 Babel webpack 构建工具的成熟，
  es6 已成为 js 编程的事实标准，
  我认为 es6 比 es5 更加简洁，提高了开发效率，让 js 代码更优雅 

  - 新增的特性
    let 变量声明和 const 常量声明，具有 var 没有的块级作用域，比如循环事件监听时，闭包就不需要了，让代码更好理解。
    var 有变量提升的能力，let const 不会到顶级对象，使用的变量或常量一下要升级
    const 声明一定要有值

  - 箭头函数
    简化了函数的表达形式
    1. 不用 function 关键字 () => { } 
    2. 如果只有一个参数，() 也可以省略
    3. 如果代码直接时返回值，{} 也可以省略 右侧的代码就是返回值
    4. 有效的规避了 this 丢失的问题 指向上一级

  - 模板字符串
    增强版的字符串，用 ``  去括号，他的多行表达方式，特别是个 react jsx template 的书写
    DOM 或 html 模板的构建 更加优雅

  - 解构
    可解 spread 可合，reset 从对象或数组中提取值，对变量进行赋值，提高开发效率

  - for of 循环
    for 计步，数组友好，但是对象， Set Map 类数组 以及字符串都可以遍历
  
  - SET es6 新增的数据结构，类似数组，唯一的，没有重复的值

  - import export es6的模块化，es6 原生支持的 module 将 js 代码分割成不同的小块独立开发，
    一个文件一个类，一个独立的模块，比如说 utils api 

  - ...展开运算符

  - 终于支持原生的 class 关键字了，让 js 有了传统面向对象的写法，extends 不过它只是语法糖，
    底层还是基于原型的面向对象

  - Promise 为 js 提供了异步解决方案，规避了回调地狱(then) 代码的书写和执行是一样的

  - 更棒的异步解决方案 es7 的 async await
    Koa 就是基于 async await 快速取代了 express 的江湖地位
  
  - vue react 响应式编程依赖的 proxy defindProperty 监听对象的改变，做一些事情

  - es6 提供了新的数据类型，Symbol


# q1. js全局执行上下文为我们创建了两个东西，一个是全局对象，一个是this关键字
  new方法的实现原理
    1. 创建一个空对象，构造函数的this指向这个空对象
    2. 这个新对象被执行[原型]连接
    3. 执行构造函数  将属性或者方法添加到this引用的对象上
    4. 如果构造函数中没有返回其他对象，那么返回this，即创建的新对象。否则，返回构造函数返回的对象

    ①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的。
    但是由于JS中函数也是一种对象，所以函数也拥有__proto__和constructor属性

# q2. call bind apply
  1. b.call(a)  就相当于把 b 里面的作用域强行指向到 a 里面去
     第一个参数一定是 this 作用域要去到的地方
     第二三四....个参数是该作用域里用到的值
  2. b.apply(a)...用到的值，但是需要用数组类型
  3. b.call || b.apply() 此时 this 的作用域会指向 window
  4. c = b.bind(a) 
     c();
     bind 方法返回的是一个修改过的函数，所以该用函数该有的姿态去调用
     bind 方法接收的参数是按照形参的顺序进行的

# q3. 浅拷贝 深拷贝
  1. 数组解构：
    let [x,y] = [1,2]
    //  x = 1,
    //  y = 2
  2. let {foo,bar} = {foo:'aaa',bar:'bbb'}
    // foo = 'aaa'
    // bar = 'bbb'
    另:(允许给赋值的变量重命名)
    let {foo:baz} = {foo:'abc'}
    // baz = 'abc'
    解析：
      1. foo是用来做匹配的，用来去结构对象里面寻找值的
      2. baz 才是变量名，baz = 'abc'
  3. 浅拷贝
    浅拷贝只是第一层属性进行拷贝，当第一层的属性为基本数据类型时，新对象和原对象互不影响，
    但是如果第一层的属性值是 # 复杂数据类型 # 那么新对象和原对象的属性值其指向的是同一块内存地址
  4. 深拷贝
    深拷贝是将对象及值复制过来，两个对象修改其中任意一个的值，另一个不会改变

# q4. 闭包
  闭包是指有权限访问 另一个函数作用域中 的变量 的函数
  1. 能够访问函数定义时所在的词法作用域（阻止其被回收）
  2. 私有化变量
  3. 模拟块级作用域
  通俗的讲就是突破私有函数的作用域，让函数外面能够使用函数里面的变量及方法。

  因为该函数可以访问它被创建时的上下文环境，这被称为闭包。js语言精粹第四章P38

# q5. 数组去重
  1. Set方法
  2. indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
  3. includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
  4. map()
  5. reduce()

# q6. 防抖节流函数原理
  设定定时器，若干秒后可以再次点击

# q7. __proto__ 和 prototype 关联    typeof instanceof
  typeof 只能判断基本数据类型 instanceof 只能判断复杂数据类型
  __proto__ 是每一个实例都有的属性，可以访问 prototype 属性
  [prototype] 属性，实例的__proto__与其构造函数的prototype指向的是同一个对象
  // 准确判断数据类型
  Object.prototype.toString.call()

# q8. ['1','2','3'].map(parseInt)

# q9. 事件委托

# q10. 一个页面从输入 url 到页面渲染完成 中间发生了什么    双向数据绑定实现

  1. 浏览器的地址栏输入URL并按下回车。
  2. 浏览器查找当前URL是否存在缓存，并比较缓存是否过期。
  3. DNS解析URL对应的IP。
  4. 根据IP建立TCP连接（三次握手）。
  5. HTTP发起请求。
  6. 服务器处理请求，浏览器接收HTTP响应。
  7. 渲染页面，构建DOM树。
  8. 关闭TCP连接（四次挥手）。

# q11. get 和 post 请求在缓存方面的区别

  get 请求类似于查找过程，用户获取数据可以不用每次都与数据库连接，所以可以使用缓存

  post 不同，post 一般做的是 修改删除数据 的工作，所以必须与数据库交互，所以不能使用缓存

  因此 get 请求更适合于请求缓存

# q12 url 长度限制

    http协议并没有限制url的长度，是浏览器或者 web浏览器 做了 url 长度的限制，并且只针对于get请求做的限制
    IE : 2803
    Firefox:65536
    Chrome:8182
    Safari:80000
    Opera:190000

# q13 前端事件流

  在 dom 标准的事件模型中，事件流包括下面几个阶段：
    1. 事件捕获阶段
    2. 处于目标阶段
    3. 事件冒泡阶段
  addEventListener 第三个参数，为true时捕获，false时冒泡，默认false （IE只支持冒泡）

# q14 预加载，懒加载 ../js/LAZY-LOAD 

  预加载，提前加载图片，当用户需要查看图片时可直接从本地缓存中加载
  懒加载，作为服务器的前端优化，减少请求或延迟请求
  
  懒加载对服务器有一定的缓解压力作用，预加载则会增加服务器的压力

# q15 js中的各种位置 
  
  clientHeigth: 表示可视区域的高度，不包含border和滚动条

  offsetHeigth: 表示可视区域的高度，包括border和滚动条

  scrollHeight: 表示所有区域的高度，包含因为滚动被隐藏的部分

  clientTop: 表示边框 border 的厚度，在未指定的情况下，一般为 0 

  scrollTop: 表示滚动后被隐藏的高度

# q16 js拖拽功能的实现

# q17 类的创建和继承+

# q18 click 在 ios 手机上有 300ms 延迟，原因及解决方法

  原因双击缩放
  1. <meta name="viewport" content="width=device-width, initial-scale=no">
    initial-scale=no 禁止缩放

  2. FastClick,其原理是检测到 touchend 事件后，立刻发出模拟 click 事件，
    并把浏览器 300ms 之后真实发出的事件阻断

# q19 cookie sessionStorage localStorage 的区别

  - cookie
      数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器之间来回传递，
      而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。
      cookie 还有路径（path）的概念，可以限制 cookie 只属于某个路径下，存储大小只有 4k 左右。
  
  - sessionStorage 
      仅在当前浏览器窗口关闭前有效，不能长久保存

  - localStorage
      在所有的同源窗口都是共享的，cookie 也是在所有同源窗口中都是共享的，
      localStorage的大小在 5M 左右

# q20 js 任务列表 （event loop）

  - narcotask(宏观任务) :
      setTimeout
      setInterval
      requestAnimationFrame
      HTML 的解析
      js 的主线程
      页面加载
      用户交互

  - mircotask(微观任务)：
      promise
      mutation.oberver
      process.nextTick
  
  script 主程序代码  ---> process.nextTick ---> promise ---> setTimeout  ---> setInterval ---> setImmediate ---> I/O --->UI rendeing

# q21 浏览器的重绘和回流

  https://juejin.im/post/5a9923e9518825558251c96a?tdsourcetag=s_pcqq_aiomsg
  浏览器渲染页面的过程
  1. 解析HTML，生成DOM树，解析 CSS，生成 CSSOM 树
  2. 将 DOM 树和 CSSOM 树结合成render树
  3. 回流，根据生成的render树，进行回流，得到节点的几何信息
  4. 重绘，根据render树和回流得到的信息，得到节点的绝对像素
  5. 将像素发给 gpu，展示在页面上

# q22 vue子组件能否修改接收到的props里面的值
   不能
  为了保证数据的单项流动，便于数据的追踪，避免数据混乱

# q23 for of 
  用于遍历 可迭代对象   iterator 迭代 
  比如 Array，Map，Set，String
  可迭代对象有两个要求
  1. 存在 Symbol.iterator 属性
  2. Symbol.iterator 是一个方法，返回一个 next 属性
    [Symbol.iterator] = () => ({
      next:() => {
        return {
          done:
          value:
        }
      }
    })

    可以自定义 for of


# q24  e.target  e.currentTarget
  e.target 触发事件的目标元素
  e.currentTarget 绑定事件的元素

# q25 垃圾回收
  - Js 垃圾回收是自动的
  - 回收内存
    function  局部变量
    跨页面时 
  1. 可达性 做为评判的依据的
    显而易见，因为一些原因不可被删除
    - 全局变量  // 不会删除
    - 当前嵌套调用链上的其他函数的变量和参数
    这些值称为根
  2. 如果引用或引用链可以从根访问任何其他值，则认为该值可访问

  let user = {
    name : "John"
  }
  global
    Object
  name: "John“
  user 全局变量，  = 引用式赋值
  name 基础属性 -> 字符串类型的John 

  user = null;   // 触发一次垃圾回收
  
  let user = {
    name : "John"
  }
  let admin = user;

    global 
  user   admin
  user = null;   

# js 
  ECMAScript：规定了 js 的语法
  DOM：
  BOM：浏览器相关的 history 窗口的resize


# 原型链
  ```js
    function Person(name){
      this.name = name
      return {}
    }
    let p = new Person('wn')
  ```
  p.__proto__  等于 Person.prototype
  实例的__proto__ 等于其构造函数的 prototype
  Person.__proto__ == Function.prototype

  1.  一般情况
    对象有__proto__ 属性，函数有 prototype 属性 
    实例为对象 对象由函数生成，
    对象的 __proto__ 指向 函数的 prototype
    
  2. 函数对象
    函数也是对象的一种，
    函数对象都是由 Function 生成，fn.__proto__ === Function.prototype
    Function 函数本身作为对象时，生成他的函数就是他自身
    Object 函数身为函数，生成它的自然是 Function 函数
  
  3. prototype
    对象的 __proto__ 属性是从生成它的函数的 prototype 中得来的，prototype 来自哪里呢？
    一般函数默认的 prototype 是一个类型为 object 的对象，他有两个属性：constructor 和 __proto__ 
    其中 constructor 属性指向这个函数本身，__proto__ 属性指向 Object.prototype
    这说明一般函数的 prototype 属性是由 Object 函数生成的
  
  4. 特殊情况
    Object 函数与 Function 函数
    Object.prototype 
      { 
        constructor: ƒ Object()
        __defineGetter__: ƒ __defineGetter__()
        __defineSetter__: ƒ __defineSetter__()
        hasOwnProperty: ƒ hasOwnProperty()
        __lookupGetter__: ƒ __lookupGetter__()
        __lookupSetter__: ƒ __lookupSetter__()
        isPrototypeOf: ƒ isPrototypeOf()
        propertyIsEnumerable: ƒ propertyIsEnumerable()
        toString: ƒ toString()
        valueOf: ƒ valueOf()
        toLocaleString: ƒ toLocaleString()
        get __proto__: ƒ __proto__()
        set __proto__: ƒ __proto__() 
      }
    
    可以看出 Object 函数的 prototype 属性也是一个类型为 object 的对象，但和一般函数的默认 prototype 属性不一样的是，
    它多了一大堆方法，这些方法都是 JavaScript 对象的系统默认方法。
    仔细看，好像少了什么，对了，Object 函数的 prototype 属性里没有 __proto__ 属性，
      Object.prototype.__proto__
      null
    这就是 Object 函数的特殊情况了： Object.prototype.__proto__ === null
    这就是 JavaScript 原型链的终点了

    typeof Object.prototype === "object"

    说明它是一个 Object 对象，如果它由 Object 生成，按通用规则，
    则应该 Object.prototype.__proto__ === Object.prototype
    为了让原型链有终点，在原型链的最顶端，JavaScript 规定了 Object.prototype.__proto__ === null 

# this
  简而言之： this 总是指向调用该函数的对象


# js中的堆内存与栈内存
  - 栈内存
    栈内存主要用于存储各种基本类型的变量，包括 Boolean、Number、String、Undefined、Null、以及对象变量的指针，
    这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。
    栈内存中的变量一般都是已知大小或者有范围上限的，算作一种简单存储 
    ! 闭包中的基本数据类型变量不保存在栈内存中，而保存在堆内存中

  - 堆内存
    堆内存主要负责像对象Object这种变量类型的存储
    堆内存存储的对象类型数据占据空间大，大小不固定
    引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。
    因此当我们要访问堆内存中的引用数据类型时，实际上我们首先是从变量中获取了该对象的地址指针， 然后再从堆内存中取得我们需要的数据。
  
  - 栈内存和堆内存的优缺点
    在JS中，基本数据类型变量大小固定，并且操作简单容易，所以把它们放入栈中存储。
    引用类型变量大小不固定，所以把它们分配给堆中，让他们申请空间的时候自己确定大小，这样把它们分开存储能够使得程序运行起来占用的内存最小。
    栈内存由于它的特点，所以它的系统效率较高。
    堆内存需要分配空间和地址，还要把地址存到栈中，所以效率低于栈。

？ 为什么 const 定义的基本类型不能改变，但是定义的对象类型是可以通过修改对象属性等方法来改变的？

在定义一个const对象的时候，我们说的常量其实是指针，就是const对象对应的堆内存指向是不变的，
但是堆内存中的数据本身的大小或者属性是可变的。而对于const定义的基础变量而言，有的话就返回错误