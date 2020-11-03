import mongoose from 'mongoose'

import { Config } from './config'

const mongoEndpoint: string = Config.env.mongoConnection || ''

export class Mongo {
  static async connect (): Promise<void> {
    try {
      console.info('[mongo] connecting...')
      mongoose.connect(mongoEndpoint, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      mongoose.connection.once('open', () => {
        console.info('[mongo] mongoose connection has been connected.')
      })
      mongoose.connection.on('error', (error) => {
        console.error('[mongo] connection error: ', error)
      })
    } catch (error) {
      console.error('[mongo] unexpected error: ', error)
    }
  }
}
