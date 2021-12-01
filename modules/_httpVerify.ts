import httpClient from './_httpClient.js'
import https, { Agent } from 'https'
import { BodyInit, HeadersInit } from 'node-fetch'
import { HttpCredential, Stage, Hint } from './_httpCertify.js'
import { URL } from 'url'

/**
 * Represents a low level Verification request
 */
interface VerifyRequest {
    stage: Stage,
    path: string,
    method: string,
    body: BodyInit | null,
    headers: HeadersInit,
    credentials?: HttpCredential
}

/**
 * Prepares and sends a VerifyRequest to the httpClient
 * It takes care of properly creating the http agent information and its corresponding urls per stage
 * @param verifyRequest
 */
export default async (verifyRequest: VerifyRequest) => {
  if (verifyRequest.stage === undefined) {
    throw new Error("Stage can't be empty.")
  }

  let httpsAgent: Agent = new https.Agent({})
  if (verifyRequest.credentials) {
    httpsAgent = new https.Agent({
      keepAlive: true,
      pfx: verifyRequest.credentials.pfxFile,
      passphrase: verifyRequest.credentials.passphrase
    })
  }

  const url = new URL(verifyRequest.path, 'https://api.uve.' + verifyRequest.stage.hint + '.ubirch.com')
  if (verifyRequest.stage.port) {
    url.port = verifyRequest.stage.port
  }
  if (verifyRequest.stage.hint === Hint.PROD) {
    url.host = 'api.uve.ubirch.com'
  }
  if (verifyRequest.stage.hint === Hint.LOCAL) {
    url.host = 'localhost'
  }

  return await httpClient({
    url: url.toString(),
    details: {
      body: verifyRequest.body,
      method: verifyRequest.method,
      headers: verifyRequest.headers,
      agent: httpsAgent
    }
  })
}
