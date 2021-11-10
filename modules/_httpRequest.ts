import fetch, { RequestInit, Response } from 'node-fetch'

type Request = {
    url: string,
    details: RequestInit
}

export default async (request: Request): Promise<Response> => {
  const resp = await fetch(request.url, request.details)

  if (resp.status > 299) {
    const message = await resp.text()
    throw new Error('response_message=' + message + ' response_status=' + resp.status)
  }

  return resp
}
