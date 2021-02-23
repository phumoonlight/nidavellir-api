import mongoose from 'mongoose'

import { env } from './config'
import { createInfoLogger, LogPrefix } from './core/logger'

const log = createInfoLogger(LogPrefix.Database)

const endpoint = env.mongoConnection || ''
const connectOptions: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const onConnect = () => {
  log('connecting...')
}

const onConnectionOpen = () => {
  log('database connection has been connected.')
}

const onConnectionError = (error: any) => {
  log('connection error: ', error)
}

const onUnexpectedError = (error: any) => {
  log('unexpected error: ', error)
}

export const connectDatabase = () => {
  try {
    onConnect()
    mongoose.connect(endpoint, connectOptions)
    mongoose.connection.once('open', () => onConnectionOpen())
    mongoose.connection.on('error', (error) => onConnectionError(error))
  } catch (error) {
    onUnexpectedError(error)
  }
}
