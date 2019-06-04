/**
 * 管理 router
 * can't find module 
 */
const Router = require('koa-router');
const router = new Router();

const user = {
  name: 'koakoakoakoa',
  posts: [{
      id: 0,
      title: '小程序踩坑☞男'
    },
    {
      id: 1,
      title: '脱发指南'
    }
  ]
}

const postsDetail = [
  {
    id:0,
    content:'啦啦啦啦啦啦啦啦啦'
  },
  {
    id:1,
    content:'<strong>哦哦哦哦哦哦哦哦哦</strong>'
  }
]

router.get('/user',async (ctx) => {
  await ctx.render('user', { user })
})
router.get('/posts',async (ctx) => {
  const { id } = ctx.query;
  const post =  postsDetail.find(postItem => postItem.id == id );
  await ctx.render('post',{post});
})
router.get('/create',async (ctx) => {
  await ctx.render('create');
})
router.post('/create',async(ctx) => {
  console.log(ctx.request.body);
  const {title,content} = ctx.request.body;
  let id = Date.now();
  user.posts.push({
    id,
    title
  })
  postsDetail.push({
    id,
    content
  })
  ctx.redirect('/user');

})


module.exports = router;
