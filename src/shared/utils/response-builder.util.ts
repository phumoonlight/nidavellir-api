/* eslint-disable camelcase */
const DEFAULT_ERROR404 = 'not found'
const DEFAULT_ERROR422 = 'unprocessable entity'
const DEFAULT_ERROR500 = 'internal server error'

interface ResponseBody {
  status_code: number
  info: any
}

export class ResponseBuilder {
  static build404 (errorInfo: any = DEFAULT_ERROR404): ResponseBody {
    return {
      status_code: 404,
      info: errorInfo,
    }
  }

  static build422 (errorInfo: any = DEFAULT_ERROR422): ResponseBody {
    return {
      status_code: 422,
      info: errorInfo,
    }
  }

  static build500 (errorInfo: any = DEFAULT_ERROR500): ResponseBody {
    return {
      status_code: 500,
      info: errorInfo,
    }
  }
}
