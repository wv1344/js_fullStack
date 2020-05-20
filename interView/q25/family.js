function marry (man,woman) {
  woman.husban = man;
  man.wife = woman;
  return {
    father : man,
    mom : woman
  }
}

let family = marry({
  name:'John'
},{
  name:'Ann'
})

              Global 
                | 
          Object(Family)
      |                  |
 Object(father) <-> Object(mom)