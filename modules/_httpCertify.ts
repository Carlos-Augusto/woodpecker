import httpClient from './_httpClient.js'
import https from 'https'
import { BodyInit, HeadersInit, Response } from 'node-fetch'
import { Buffer } from 'buffer'
import { URL } from 'url'

export enum Hint {
    LOCAL = 'local',
    DEV = 'dev',
    DEMO = 'demo',
    QA = 'qa',
    PROD = 'prod'
}

export interface Stage {
    hint: Hint,
    port?: string
}

export interface HttpCredential {
    pfxFile: Buffer,
    passphrase: string
}

export interface CertifyRequest extends HttpCredential {
    stage: Stage,
    path: string,
    method: string,
    body: BodyInit | null,
    headers: HeadersInit
}

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
