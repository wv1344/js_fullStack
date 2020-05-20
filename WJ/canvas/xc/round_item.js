/**
 * @author lll
 * @date 19/4/18
 * @param {*} index 
 * @param {*} x 
 * @param {*} y 
 */
function Round_item(index,x,y,context){
  this.index = index;
  this.x = x;
  this.y = y;
  this.context = context;
  this.r = Math.random() * 120 + 1;
  var alpha = Math.floor(Math.random() * 10 ) / 10 /2;
  // floor 向下取整
  this.color = `rgba(255,255,255,${alpha})`;

}
Round_item.prototype.draw = function(){
  this.context.fillStyle = this.color;
  this.context.shadowBlur = this.r * 2;
  this.context.beginPath();
  this.context.arc(this.x,this.y,this.r,0,2 * Math.PI,false);
  this.context.font="14px"
  this.context.fillText("foo",this.x,this.y,)
  this.context.moveTo(this.x,this.y);//起始位置
  this.context.lineTo(this.x,this.y);//停止位置
  this.context.closePath();
  this.context.fill();
}
Round_item.prototype.move = function (){
  this.y -= 0.15;
  this.y += Math.random()
  this.y -= Math.random()
  // if (this.y <= -10){
  //   this.y = HTIGHT + 10;
  // }
  this.draw();
}