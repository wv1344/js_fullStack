const express = require('express')
const router = express.Router();

router.get('/:name',function(req,res){
  // res.send('hello,' + req.params.name)
  console.log('name')
  res.render('users',{
    name:req.params.name,
    supplies:['1','2','3','4']
  })
})


module.exports = router;