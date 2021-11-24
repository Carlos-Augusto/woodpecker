import httpClient from './_httpClient.js'
import https from 'https'
import { BodyInit, HeadersInit, Response } from 'node-fetch'
import { Buffer } from 'buffer'
import { URL } from 'url'

/**
 * Represents the stage against which
 * the certification and verifications are executed.
 */
export enum Hint {
    LOCAL = 'local',
    DEV = 'dev',
    DEMO = 'demo',
    QA = 'qa',
    PROD = 'prod'
}

/**
 * Represents the stage against which
 * the certification and verifications are executed and a possible port
 */
export interface Stage {
    hint: Hint,
    port?: string
}

/**
 * Represents the supported/needed credentials to identify as client against
 * the certification and verification servers.
 */
export interface HttpCredential {
    pfxFile: Buffer,
    passphrase: string
}

/**
 * Represents a low level request to the certification service.
 */
export interface CertifyRequest extends HttpCredential {
    stage: Stage,
    path: string,
    method: string,
    body: BodyInit | null,
    headers: HeadersInit
}

/**
 * Prepares and sends a CertifyRequest to the httpClient.
 * It takes care of properly creating the http agent information and its corresponding urls per stage
 * @param certifyRequest represents the certification request.
 */
export default async (certifyRequest: CertifyRequest): Promise<Response> => {
  if (certifyRequest.stage === undefined) {
    throw new Error("Stage can't be empty.")
  }

  let httpsAgent = new https.Agent({
    keepAlive: true,
    pfx: certifyRequest.pfxFile,
    passphrase: certifyRequest.passphrase
  })

  const url = new URL(certifyRequest.path, 'https://api.certify.' + certifyRequest.stage.hint + '.ubirch.com')
  if (certifyRequest.stage.port) {
    url.port = certifyRequest.stage.port
  }
  if (certifyRequest.stage.hint === Hint.PROD) {
    url.host = 'api.certify.ubirch.com'
  }
  if (certifyRequest.stage.hint === Hint.LOCAL) {
    url.host = 'localhost'
    httpsAgent = new https.Agent({})
  }

  return await httpClient({
    url: url.toString(),
    details: {
      body: certifyRequest.body,
      method: certifyRequest.method,
      headers: certifyRequest.headers,
      agent: httpsAgent
    }
  })
}
