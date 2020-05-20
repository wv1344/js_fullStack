let fn = function () {
  setTimeout(() => {
    console.log('--------')
  },60)
}

let fnB = function() {
  fn()
  console.log('000000000')

}

fnB()