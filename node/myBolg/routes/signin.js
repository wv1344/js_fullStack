const express = require('express')
const router = express.Router();

router.post('/',function(res,req,next){
  res.setEncoding('signin');
})

module.exports = router