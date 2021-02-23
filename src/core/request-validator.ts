import { RequestHandler } from 'express'

export interface ValidateParamOptions {
  name: string
  validator: (value: any) => boolean
}

export const validateParam = ({
  name,
  validator,
}: ValidateParamOptions): RequestHandler => {
  return (req, res, next) => {
    const param = req.params[name]
    const isValid = validator(param)
    if (isValid) return next()
    res.status(422)
    res.json({
      message: `invalid param {${name}}`,
    })
  }
}

interface Config<T = any> {
  name: string
  isOptional?: boolean
  validator: (value: T) => boolean | Promise<boolean>
}

export const validateBody = <T = any>({
  name,
  isOptional = false,
  validator,
}: Config<T>): RequestHandler => {
  return async (req, res, next) => {
    try {
      const target = req.body[name]
      const isUndef = typeof target === 'undefined'
      const shouldSkip = isOptional && isUndef
      if (shouldSkip) return next()
      const isValid = await validator(req.body)
      if (isValid) return next()
      throw new Error()
    } catch (error) {
      res.status(422)
      res.json({
        message: `invalid body {${name}}`,
      })
    }
  }
}
