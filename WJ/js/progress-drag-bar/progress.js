class Progress {
  constructor(selector,options){
    console.log(selector)
    this.options = options
    this.parentDom = document.querySelector(selector)
    this.initDom()
  }
  initDom(){
    this.parentDom.innerHTML = `
    <div class="progress-bar">
      <div class="progress"></div>
      <div class="progress-button"></div>
    </div>
    `
    this.progressBarDom = document.querySelector('.progress-bar');
    this.progressDom = document.querySelector('.progress')
    this.progressBtnDom = document.querySelector('.progress-button')
    this.initProgress();
    this.initEvent();
  }
  initProgress(){
    const { progress = 0 } = this.options;
    this.progressBarDomWidth = this.progressBarDom.offsetWidth;
    this.progressDom.style.width = `${progress*100}%`
    this.progressBtnDom.style.left = `${progress*this.progressBarDomWidth}px`
  }

  initEvent(){
    const { disableDrag= false ,onDragStart,onDrag } = this.options
    if(disableDrag) return false;
    this.progressBtnDom.addEventListener('touchStart',(e) => {
      const touch = e.touches[0];
      downX = touch.clientX;
      if(onDragStart) onDragStart();
    })
    let downX = 0;
    let btnLeft = 0;
    this.progressBtnDom.addEventListener('touchmove',(e) =>{
      e.preventDefault();
      const touch = e.touches[0];
      const diffx = touch.clientX - downX;
      const newBtnLeft = diffx + btnLeft;
      if(newBtnLeft > this.progressBarDomWidth){
        newBtnLeft = this.progressBarDomWidth
      }else if(newBtnLeft < 0){
        newBtnLeft = 0;
      }
      this.progressDom.style.width = `${newBtnLeft / this.progressBarDomWidth * 100}%`
      this.progressBtnDom.style.left = `${newBtnLeft}px`;
      if(onDrag) onDrag(newBtnLeft/progressBarDomWidth *100);
    })
    this.progressBtnDom.addEventListener('touchEnd',() => {
      const {onDragEnd } = this.options;
      if(onDragEnd) onDragEnd()
    })
  }
}
export default Progress