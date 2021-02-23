import { RequestHandler } from 'express'
import { createInfoLogger, LogPrefix } from './logger'

const log = createInfoLogger(LogPrefix.Request)

export const logRequest = (): RequestHandler => {
  return (req, res, next) => {
    log(`${req.method} ${req.url}`)
    next()
  }
}
