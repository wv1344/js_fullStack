const Koa = require('koa');
const path = require('path');
// 支持哪些模板引擎
const views = require('koa-views');
const ejs = require('ejs');
const app = new Koa();

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

app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

// /user 个人主页面
// /posts 文章详情
app.use(async (ctx) => {
  // 区分 页面
  // console.log(ctx.path);
  if (ctx.path === '/user') {
    await ctx.render('user', {
      user
    });
  } else if (ctx.path === '/posts') {
    // http://localhost:8080/posts?id=0
    const { id } = ctx.query;
    const post = postsDetail.find(postItem => postItem.id == id);
    await ctx.render('post',{ post });
  } else {
    ctx.body = `无法处理该请求`
  }
})

app.listen(8080, () => {
  console.log('server is running 8080');
})