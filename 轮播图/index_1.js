function Sp(options) {
  init(options)
}

function init(options) {
  var oBox = document.getElementById('box');
  var oUl = document.querySelector('#box ul');
  var aLi = oUl.children;
  var iNow = 1;
  var x = -iNow * aLi[0].offsetWidth;
  //在这里设置一个开关,是css运动结束后解锁
  var bReady = true;



  let move = function (e) {
    x = ev.targetTouches[0].pageX - disX;
    oUl.style.transform = 'translate3d(' + x + 'px,0,0)';
  }
  let end = function (e) {
    var upX = ev.changedTouches[0].pageX;
    //判断是否移动距离大于50
    if (Math.abs(upX - downX) > 50) {
      //左边移动
      if (upX - downX < 0) {
        iNow++;
        if (iNow == aLi.length) { iNow = aLi.length - 1; }
      } else {
        //右边移动
        iNow--;
        if (iNow == -1) { iNow = 0; }
      }
    }
    //储存此时ul的位置
    x = -iNow * aLi[0].offsetWidth;
    oUl.style.transform = 'translate3d(' + x + 'px,0,0)';
    oUl.style.transition = '200ms all ease';
  }
  let tend = function() {
    if (iNow == 5) {
      iNow = 1;
    }
    if (iNow == 0) { iNow = 4; }
    oUl.style.transition = 'none'
    x = -iNow * aLi[0].offsetWidth;
    oUl.style.transform = 'translate3d(' + x + 'px,0,0)';
    bReady = true;
  }

  oUl.addEventListener('touchstart', function () {
    if (bReady == false) { return; }
    bReady = false;
    oUl.style.transition = 'none';
    var disX = ev.targetTouches[0].pageX - x;
    var downX = ev.targetTouches[0].pageX;
  })
  oUl.addEventListener('touchmove',function(e) {
    move(e)
  })
  oUl.addEventListener('touchend',function(e){
    end(e)
  })

}
new Sp({
  el: 'wrapper'
})