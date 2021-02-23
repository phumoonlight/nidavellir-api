export enum LogPrefix {
  Server = '[server]',
  Database = '[database]',
  Request = '[request]'
}

export const createInfoLogger = (prefix: LogPrefix) => {
  return (...value: any[]) => {
    console.info(prefix, ...value)
  }
}
