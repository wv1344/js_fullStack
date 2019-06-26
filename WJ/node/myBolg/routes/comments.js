const express = require('express')
const router = express.Router();

router.post('/',function(res,req,next){
  res.setEncoding('创建留言');
})

module.exports = router