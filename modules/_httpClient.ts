import fetch, { RequestInit, Response } from 'node-fetch'

/**
 * Represents an http request. It is an abstraction specific to the
 * http client technology.
 */
type Request = {
    url: string,
    details: RequestInit
}

/**
 * Executes a Request.
 * If the response status is > 299, an error log is produced.
 * @param request Abstraction for a http request
 */
export default async (request: Request): Promise<Response> => {
  const resp = await fetch(request.url, request.details)

  if (resp.status > 299) {
    const message = await resp.text()
    throw new Error('response_message=' + message + ' response_status=' + resp.status)
  }

  return resp
}
