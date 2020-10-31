import { RequestHandler } from 'express'

export namespace Tracer {
  const PREFIX = '[tracer]'
  export const traceRequest: RequestHandler = (req, res, next) => {
    console.info(`${PREFIX} ${req.method} ${req.url}`)
    next()
  }
}
