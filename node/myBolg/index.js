const express = require('express')
const path = require('path')
const app = express();
const routes = require('./routes/index')
// const userRouter = require('./routes/users')

// app.set 路径 模板引擎设置
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

// app.use(function(req,res,next) {
//   console.log('1');
//   next();
// })

// app.use(function(req,res,next) {
//   console.log('2');
//   // res.status(200).end();
//   next()
// })


// app.get('/',function(req,res) {
//   res.send('hello,express')
// })

// app.get('/users/:name',function(req,res) {
//   res.send('hello  ' + req.params.name);
// })

// app.use('/',indexRouter);
// app.use('/users',userRouter)
routes(app);

app.listen(3000)