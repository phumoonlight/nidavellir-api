import { RequestHandler, Request } from 'express'
import { Response } from './response'

interface Callback {
  (req: Request): Response | Promise<Response>
}

export const handle = (callback: Callback): RequestHandler => {
  return async (req, res, next) => {
    try {
      const response = await callback(req)
      res.status(response.statusCode)
      res.json(response.data)
    } catch (error) {
      next(error)
    }
  }
}
