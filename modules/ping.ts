import httpCertify, { HttpCredential, Stage } from './_httpCertify.js'

/**
 * Represents a simple "ping" event.
 */
export interface Ping {
    stage: Stage,
    credentials?: HttpCredential
}

/**
 * Function that pings the certification server
 * @param ping simple object to ping the certification server.
 */
export default async (ping: Ping) => {
  const resp = await httpCertify({
    stage: ping.stage,
    path: '',
    method: 'get',
    body: null,
    headers: {},
    credentials: ping.credentials
  })
  return resp.buffer()
}
