let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  // let in 对象
  // let of 数组

  for(let key in transformNames){
    if(elementStyle[transform[key]] !== undefined){
      return key
    }
  }
  return false
})

export function prefixStyle(style){
  if(vendor === false){
    return false
  }
  if(vendor === 'standard'){
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}