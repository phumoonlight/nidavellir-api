import { StatusCode } from '../enums/status-code.enum'

export class Response {
  statusCode: StatusCode
  data: any

  constructor(statusCode: StatusCode, data: any) {
    this.statusCode = statusCode
    this.data = data
  }
}

export class InternalServerError extends Error {
  statusCode = 500
}

export class BadRequest extends Error {
  statusCode = 400
}
