export interface InfoResponse {
  info: any
}

export enum ResponseStatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

export const a = 2
