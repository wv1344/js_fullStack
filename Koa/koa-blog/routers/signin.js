const router = require('koa-router')();

router.get('/signin', async(ctx, next) => {
  
  await ctx.render('signin')
})
router.post('/signin',async(ctx,next) => {
  console.log(ctx.request.body)
  await ctx.render('main')
})

module.exports=router