const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const Harvest = require('node-harvest-api')
const secrets = require('./secrets.json')

const app = new Koa()
const router = new Router()

app.use(serve('./static'))

router.get('/api/me', async (ctx) => {
  const harvest = new Harvest(secrets.account_id, secrets.token, secrets.app_name)
  ctx.body = await harvest.users.me()
})

router.get('/api/timers/:user?/:limit?', async (ctx) => {
  const harvest = new Harvest(secrets.account_id, secrets.token, secrets.app_name)
  ctx.body = await harvest.time_entries.get({
    user_id: ctx.params.user || secrets.user_id,
    limit: ctx.params.limit || 100
  })
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)

console.log('http://localhost:3000')
