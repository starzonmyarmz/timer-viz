const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const fs = require('fs')
const HTMLParser = require('node-html-parser');
const Harvest = require('node-harvest-api')
const secrets = require('./secrets.json')

const app = new Koa()
const router = new Router()

app.use(serve('./static'))

fs.readdir('./static/viz', (err, dirs) => {
  if (err) return

  let html = []
  let file = './static/menu.html'

  dirs.sort((a, b) => { return a - b }).forEach((dir) => {
    html.push(`<li><a href="/viz/${dir}">${dir}</a></li>`)
  })

  fs.readFile(file, 'utf8', (err, data) => {
    let menu = HTMLParser.parse(data)
    let ul = menu.querySelector('#menu-options')

    ul.set_content(html.join(''))

    const stream = fs.createWriteStream(file)

    stream.once('open', () => {
      stream.end(menu.toString())
    })
  })
})

router.get('/api/me', async (ctx) => {
  const harvest = new Harvest(secrets.account_id, secrets.token, secrets.app_name)
  ctx.body = await harvest.users.me()
})

router.get('/api/timers/:limit?/:user?', async (ctx) => {
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
