const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const app = new Koa()
const router = new Router()
app.use(serve('./static'))
router.get('/timers', async (ctx, next) => {
  ctx.body = 'timers'
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)

console.log('http://localhost:3000')
