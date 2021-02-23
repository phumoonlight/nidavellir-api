import express from 'express'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'

import { env } from './config'
import { connectDatabase } from './database'
import { createInfoLogger, LogPrefix } from './core/logger'
import { logRequest } from './core/request-logger'
// import { TagRouter } from 'src/containers/comic/comic-router'
import { comicController } from './containers/comic/comic-controller'

connectDatabase()
const log = createInfoLogger(LogPrefix.Server)

// import { Database } from './database'

// const docRef = db.collection('users').doc()

// docRef.set({
//   first: 'percy',
//   last: 'Lovelace',
//   born: Math.round(Math.random() * 1000),
// })
// const snapshot = Database.collection('users').get()
// snapshot.then((snap) => {
//   console.log(snap.docs.map((user) => {
//     return {
//       id: user.id,
//       ...user.data(),
//     }
//   }))
// })
// let usersss: any
// import { Database } from './database'
// import { RequestTracer } from './common/middlewares/request-tracer.middleware'
// import { StatusCode } from './common/constants/status-code.const'
// import { TagRouter } from './containers/tag/tag.router'
// import { TagCollectionRouter } from './containers/tag-collection/tag-collection.router'

const app = express()
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(logRequest())
app.use('/comics', comicController)

app.get('/', async (req, res) => {
  res.status(200)
  res.send('OK')
})

app.get('/favicon.ico', (req, res) => {
  res.status(204)
  res.end()
})

app.listen(env.port, () => {
  log('listening.')
  log(`port: ${env.port}`)
  log(`env: ${env.nodeEnv}`)
})
