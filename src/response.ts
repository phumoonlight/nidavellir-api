import { InfoResponse, ResponseStatusCode } from './types/response'

const DEFAULT_ERROR404 = 'not found'
const DEFAULT_ERROR422 = 'unprocessable entity'
const DEFAULT_ERROR500 = 'internal server error'

export const getInfoResponse = (
  statusCode: ResponseStatusCode,
  info?: any
): InfoResponse => {
  const response: InfoResponse = {
    info: null,
  }
  if (info) {
    response.info = info
    return response
  }
  let defaultInfo = ''
  switch (statusCode) {
    case ResponseStatusCode.NotFound:
      defaultInfo = DEFAULT_ERROR404
      break
    case ResponseStatusCode.UnprocessableEntity:
      defaultInfo = DEFAULT_ERROR422
      break
    case ResponseStatusCode.InternalServerError:
    default:
      defaultInfo = DEFAULT_ERROR500
  }
  response.info = defaultInfo
  return response
}

export const getInternalErrorResponse = (info: any = DEFAULT_ERROR500): InfoResponse => ({
  info,
})
